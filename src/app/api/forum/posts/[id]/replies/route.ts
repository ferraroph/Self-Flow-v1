import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { PrismaClient } from '@prisma/client';
import { awardBadge } from '@/lib/badges';

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId: clerkId } = auth();
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { content } = await request.json();
    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const reply = await prisma.reply.create({
      data: {
        content,
        authorId: user.id,
        postId: params.id,
      },
    });
    
    // Award points
    await prisma.user.update({
        where: { id: user.id },
        data: { points: { increment: 2 } },
      });

    // Award "Engaged" badge if it's the user's first reply
    const replyCount = await prisma.reply.count({ where: { authorId: user.id } });
    if (replyCount === 1) {
        await awardBadge(user.id, 'Engaged');
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error(`Error creating reply for post ${params.id}:`, error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
