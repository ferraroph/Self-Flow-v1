import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const mentors = await prisma.user.findMany({
      where: {
        points: {
          gt: 100, // Users with more than 100 points can be mentors
        },
        menteeId: null, // Mentors cannot be mentees themselves
      },
      select: {
        id: true,
        fullName: true,
        points: true,
      },
    });

    return NextResponse.json({ mentors });
  } catch (error) {
    console.error('Error fetching mentors:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
