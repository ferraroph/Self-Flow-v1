import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { PrismaClient } from '@prisma/client';
import { awardBadge, seedBadges } from '@/lib/badges';

const prisma = new PrismaClient();

// Seed the badges into the database
seedBadges();

export async function POST(request: NextRequest) {
  try {
    const { userId: clerkId } = auth();
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { fullName, birthDate } = body;

    const user = await prisma.user.upsert({
      where: { clerkId },
      update: {
        fullName,
        birthDate: new Date(birthDate),
      },
      create: {
        clerkId,
        fullName,
        birthDate: new Date(birthDate),
      },
    });

    // Award the "First Steps" badge
    await awardBadge(user.id, 'First Steps');

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error in onboarding API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
