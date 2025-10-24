import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { userId: clerkId } = auth();
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { mentorId } = await request.json();
    if (!mentorId) {
      return NextResponse.json({ error: 'Mentor ID is required' }, { status: 400 });
    }

    // Assign mentor to the user (mentee)
    await prisma.user.update({
      where: { id: user.id },
      data: { mentorId },
    });
    
    // Assign mentee to the mentor
    await prisma.user.update({
        where: { id: mentorId },
        data: { menteeId: user.id },
      });

    return NextResponse.json({ success: true, message: "Mentorship request sent." });
  } catch (error) {
    console.error('Error in request-mentorship API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
