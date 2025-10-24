import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET a single conversation
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId: clerkId } = auth();
    if (!clerkId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const conversation = await prisma.privateConversation.findFirst({
      where: {
        id: params.id,
        participants: { some: { id: user.id } },
      },
      include: {
        messages: {
          include: { sender: { select: { id: true, fullName: true } } },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!conversation) return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });

    return NextResponse.json({ conversation });
  } catch (error) {
    console.error(`Error fetching conversation ${params.id}:`, error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// SEND a message in a conversation
export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    try {
      const { userId: clerkId } = auth();
      if (!clerkId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
      const user = await prisma.user.findUnique({ where: { clerkId } });
      if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  
      const conversation = await prisma.privateConversation.findFirst({
        where: {
          id: params.id,
          participants: { some: { id: user.id } },
        },
        include: { participants: true },
      });
  
      if (!conversation) return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
  
      const { content } = await request.json();
      if (!content) return NextResponse.json({ error: 'Content is required' }, { status: 400 });

      const recipient = conversation.participants.find(p => p.id !== user.id);
      if(!recipient) return NextResponse.json({ error: 'Recipient not found' }, { status: 404 });
  
      const message = await prisma.privateMessage.create({
        data: {
          content,
          senderId: user.id,
          recipientId: recipient.id,
          conversationId: params.id,
        },
      });
  
      return NextResponse.json({ message });
    } catch (error) {
      console.error(`Error sending message in conversation ${params.id}:`, error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
