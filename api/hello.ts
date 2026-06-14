import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  console.log('/api/hello called');
  return res.status(200).json({ message: 'Hello from Vercel Function!' });
}
