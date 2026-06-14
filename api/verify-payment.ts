import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('[/api/verify-payment] Received request:', req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    console.log('[/api/verify-payment] Verifying payment with order:', razorpay_order_id, 'payment:', razorpay_payment_id);

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '');
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generatedSignature = hmac.digest('hex');

    const isSignatureValid = generatedSignature === razorpay_signature;

    if (!isSignatureValid) {
      console.error('[/api/verify-payment] Invalid signature');
      return res.status(400).json({ success: false, error: 'Invalid payment signature' });
    }

    console.log('[/api/verify-payment] Payment verified successfully');

    // TODO: Here you would normally:
    // 1. Update user's subscription status in your database
    // 2. Create a transaction record
    // 3. Send a confirmation email, etc.

    return res.status(200).json({ success: true, message: 'Payment verified' });
  } catch (error) {
    console.error('[/api/verify-payment] Error:', error);
    return res.status(500).json({ success: false, error: 'Failed to verify payment' });
  }
}
