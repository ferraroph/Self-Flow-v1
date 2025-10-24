import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { PrismaClient } from '@prisma/client';
import { awardBadge } from '@/lib/badges';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { userId: clerkId } = auth();
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { answers } = body;
    if (!answers) {
      return NextResponse.json({ error: 'Answers are required' }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { clerkId },
      data: {
        onboardingData: answers,
        points: {
          increment: 10,
        },
      },
    });

    // Award the "Psychonaut" badge
    await awardBadge(user.id, 'Psychonaut');

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Error in psychological-test API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
