import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const generatePsychologicalSummary = (data: Prisma.JsonValue): string => {
    if (!data || typeof data !== 'object' || Array.isArray(data)) return '';
    const answers = data as { [key: string]: string };
    let summary = 'Their self-reported psychological profile indicates the following tendencies: ';
    const descriptions: string[] = [];
    if (answers.q1) descriptions.push(`when facing a difficult decision, they are ${answers.q1}`);
    if (answers.q2) descriptions.push(`under stress, they are ${answers.q2}`);
    if (answers.q3) descriptions.push(`their primary motivation is ${answers.q3}`);
    if (descriptions.length === 0) return '';
    return summary + descriptions.join(', ') + '. You must use these traits to inform your responses and guidance.';
};

const checkForIntervention = (message: string): string | null => {
    const lowerCaseMessage = message.toLowerCase();
    if (lowerCaseMessage.includes('anxious') || lowerCaseMessage.includes('stressed') || lowerCaseMessage.includes('overwhelmed')) {
        return "It sounds like you're feeling overwhelmed. Let's try a simple breathing exercise. Inhale for 4 seconds, hold for 4, and exhale for 6. Let's do this three times. Ready?";
    }
    if (lowerCaseMessage.match(/i should|i need to|i have to/) && lowerCaseMessage.includes('but')) {
        return "It sounds like there's a conflict between what you think you should do and what you feel like doing. That's a common pattern. What's one very small step, even a tiny one, you could take toward that 'should' right now?";
    }
    return null;
};

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    const body = await request.json();
    const { message, conversationId } = body;

    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    let conversation;
    if (conversationId) {
      conversation = await prisma.conversation.findUnique({ where: { id: conversationId } });
    } else {
      conversation = await prisma.conversation.create({
        data: { userId: user.id, title: message.substring(0, 30) },
      });
    }

    if (!conversation) return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });

    await prisma.message.create({
      data: { conversationId: conversation.id, role: 'USER', content: message },
    });
    
    const intervention = checkForIntervention(message);
    if (intervention) {
        await prisma.message.create({
            data: { conversationId: conversation.id, role: 'ASSISTANT', content: intervention },
        });
        return NextResponse.json({ response: intervention, conversationId: conversation.id });
    }

    let systemPrompt = `You are a personalized AI assistant for ${user.fullName}, acting as their digital twin or "Duplo". Your purpose is to help them gain absolute clarity and insights based on their numerology map and personality profile. You are empathetic, insightful, and always supportive, but your primary goal is to provide unfiltered clarity, even if it's uncomfortable. The user's birth date is ${user.birthDate}.`;
    const psychologicalSummary = generatePsychologicalSummary(user.onboardingData);
    if (psychologicalSummary) systemPrompt += ` ${psychologicalSummary}`;

    let finalMessage = message;
    if (message.startsWith('/devaneio')) {
        const scenario = message.substring(10);
        systemPrompt += ` The user wants to explore a hypothetical scenario ("Modo Devaneio"). Your task is to simulate the potential outcomes of the following situation: "${scenario}". Walk them through the likely consequences, both positive and negative, based on their known personality traits and numerological profile.`;
        finalMessage = `Please begin the simulation for: "${scenario}"`;
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'model', parts: [{ text: 'I understand my role. I am the user\'s clear, unfiltered self. I am ready to assist.' }] },
        ...(await prisma.message.findMany({
          where: { conversationId: conversation.id },
          orderBy: { timestamp: 'asc' },
        })).map((msg) => ({
          role: msg.role === 'USER' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        })),
      ],
      generationConfig: { maxOutputTokens: 1500 },
    });

    const result = await chat.sendMessage(finalMessage);
    const response = await result.response;
    const text = response.text();

    await prisma.message.create({
      data: { conversationId: conversation.id, role: 'ASSISTANT', content: text },
    });

    return NextResponse.json({ response: text, conversationId: conversation.id });
  } catch (error) {
    console.error('Error in conversation API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
