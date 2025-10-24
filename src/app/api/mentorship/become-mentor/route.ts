import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
  try {
    const { userId: clerkId } = auth();
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.points <= 100) {
      return NextResponse.json({ error: 'You need more than 100 points to become a mentor.' }, { status: 403 });
    }
    
    // In a real application, you might have a more formal process.
    // For now, we just mark them as available by ensuring they are not a mentee.
    await prisma.user.update({
        where: { id: user.id },
        data: { menteeId: null },
    });

    return NextResponse.json({ success: true, message: "You are now listed as a mentor." });
  } catch (error) {
    console.error('Error in become-mentor API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
