import type { VercelRequest, VercelResponse } from '@vercel/node';
import Razorpay from 'razorpay';
import crypto from 'crypto';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('[/api/create-order] Received request:', req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { amount, currency = 'INR' } = req.body;

    if (!amount) {
      return res.status(400).json({ success: false, error: 'Amount is required' });
    }

    console.log('[/api/create-order] Creating Razorpay order for amount:', amount, currency);

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || '',
      key_secret: process.env.RAZORPAY_KEY_SECRET || '',
    });

    const options = {
      amount: amount, // Amount in paise
      currency: currency,
      receipt: `receipt_${crypto.randomBytes(8).toString('hex')}`,
    };

    const order = await razorpay.orders.create(options);

    console.log('[/api/create-order] Razorpay order created:', order.id);

    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('[/api/create-order] Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create order',
    });
  }
}
