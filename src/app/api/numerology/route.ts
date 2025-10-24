import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { PrismaClient } from '@prisma/client';
import {
  calculateMotivationNumber,
  calculateImpressionNumber,
  calculateExpressionNumber,
  calculateDestinyNumber,
} from '@/lib/numerology';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user || !user.fullName || !user.birthDate) {
      return NextResponse.json({ error: 'User data not found' }, { status: 404 });
    }

    const motivation = calculateMotivationNumber(user.fullName);
    const impression = calculateImpressionNumber(user.fullName);
    const expression = calculateExpressionNumber(user.fullName);
    const destiny = calculateDestinyNumber(user.birthDate);

    const numerologyMap = await prisma.numerologyMap.upsert({
      where: { userId: user.id },
      update: {
        motivacao: motivation,
        impressao: impression,
        expressao: expression,
        destino: destiny,
      },
      create: {
        userId: user.id,
        motivacao: motivation,
        impressao: impression,
        expressao: expression,
        destino: destiny,
      },
    });

    return NextResponse.json({ numerologyMap });
  } catch (error) {
    console.error('Error in numerology API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
