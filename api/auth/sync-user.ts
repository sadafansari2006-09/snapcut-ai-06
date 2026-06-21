import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '../../src/generated/prisma/index.js';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('[API:auth/sync-user] Request received:', req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { id, email, name } = req.body;

    if (!id || !email) {
      return res.status(400).json({ success: false, error: 'ID and email are required' });
    }

    // Check if user already exists in Prisma
    let user = await prisma.user.findUnique({
      where: { id },
    });

    if (user) {
      // Update existing user if needed
      user = await prisma.user.update({
        where: { id },
        data: { name },
      });
    } else {
      // Create new user
      user = await prisma.user.create({
        data: {
          id,
          email,
          name: name || null,
        },
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('[API:auth/sync-user] Error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}
