import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const badges = [
  { name: 'First Steps', description: 'Complete the onboarding process.', icon: '👣' },
  { name: 'Psychonaut', description: 'Complete the psychological test.', icon: '🧠' },
  { name: 'Community Starter', description: 'Create your first post in the forum.', icon: '✍️' },
  { name: 'Engaged', description: 'Post your first reply in the forum.', icon: '💬' },
];

// Function to create badges if they don't exist
export async function seedBadges() {
  for (const badgeData of badges) {
    await prisma.badge.upsert({
      where: { name: badgeData.name },
      update: {},
      create: badgeData,
    });
  }
}

// Function to award a badge to a user
export async function awardBadge(userId: string, badgeName: string) {
  try {
    const badge = await prisma.badge.findUnique({ where: { name: badgeName } });
    if (!badge) {
      console.error(`Badge ${badgeName} not found.`);
      return;
    }

    const existingBadge = await prisma.userBadge.findFirst({
      where: { userId, badgeId: badge.id },
    });

    if (!existingBadge) {
      await prisma.userBadge.create({
        data: {
          userId,
          badgeId: badge.id,
        },
      });
      // Also award points for earning a badge
      await prisma.user.update({
        where: { id: userId },
        data: { points: { increment: 25 } }, // e.g., 25 points per badge
      });
      console.log(`Awarded badge "${badgeName}" to user ${userId}`);
    }
  } catch (error) {
    console.error(`Failed to award badge ${badgeName} to user ${userId}:`, error);
  }
}
