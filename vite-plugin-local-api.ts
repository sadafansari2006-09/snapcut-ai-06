import type { Plugin, ViteDevServer } from 'vite';
import { loadEnv } from 'vite';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function localApiPlugin(): Plugin {
  return {
    name: 'vite-plugin-local-api',
    configureServer(server: ViteDevServer) {
      console.log('[vite-plugin-local-api] Configuring server...');
      const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');
      
      console.log('[vite-plugin-local-api] Loading environment variables...');

      // Auth: Sync user endpoint
      server.middlewares.use('/api/auth/sync-user', async (req, res) => {
        console.log('[vite-plugin-local-api] /api/auth/sync-user request received');

        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, error: 'Method not allowed' }));
        }

        try {
          let body = '';
          for await (const chunk of req) {
            body += chunk;
          }
          const { id, email, name } = JSON.parse(body);

          if (!id || !email) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ success: false, error: 'ID and email are required' }));
          }

          let user = await prisma.user.findUnique({ where: { id } });
          
          if (user) {
            user = await prisma.user.update({ where: { id }, data: { name } });
          } else {
            user = await prisma.user.create({ data: { id, email, name: name || null } });
          }

          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: true, user }));
        } catch (error) {
          console.error('[vite-plugin-local-api] /api/auth/sync-user error:', error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, error: 'Internal server error' }));
        }
      });

      server.middlewares.use('/api/create-order', async (req, res) => {
        console.log('[/api/create-order] === REQUEST RECEIVED ===');
        console.log('[/api/create-order] Method:', req.method);
        console.log('[/api/create-order] Headers:', req.headers);

        if (req.method !== 'POST') {
          console.log('[/api/create-order] ERROR: Method not allowed');
          res.writeHead(405, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, error: 'Method not allowed' }));
        }

        try {
          console.log('[/api/create-order] Reading request body...');
          let body = '';
          for await (const chunk of req) {
            body += chunk;
          }
          console.log('[/api/create-order] Raw request body:', body);

          const { amount, currency = 'INR' } = JSON.parse(body);
          console.log('[/api/create-order] Parsed body:', { amount, currency });

          if (!amount) {
            console.log('[/api/create-order] ERROR: Amount is required');
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ success: false, error: 'Amount is required' }));
          }

          console.log('[/api/create-order] Initializing Razorpay client...');
          const razorpay = new Razorpay({
            key_id: env.VITE_RAZORPAY_KEY_ID || '',
            key_secret: env.RAZORPAY_KEY_SECRET || '',
          });

          console.log('[/api/create-order] Razorpay client initialized!');

          const options = {
            amount: amount,
            currency: currency,
            receipt: `receipt_${crypto.randomBytes(8).toString('hex')}`,
          };
          console.log('[/api/create-order] Order creation options:', options);

          console.log('[/api/create-order] Calling razorpay.orders.create()...');
          const order = await razorpay.orders.create(options);
          console.log('[/api/create-order] razorpay.orders.create() SUCCESS! Order:', order);

          console.log('[/api/create-order] Returning response with orderId:', order.id);

          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
          }));
        } catch (error) {
          console.error('[/api/create-order] === ERROR CAUGHT ===');
          console.error('[/api/create-order] Error name:', (error as any).name);
          console.error('[/api/create-order] Error message:', (error as any).message);
          console.error('[/api/create-order] Error stack:', (error as any).stack);
          console.error('[/api/create-order] Full error object:', error);

          res.writeHead(500, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({
            success: false,
            error: 'Failed to create order',
            details: (error as any).message
          }));
        }
      });

      server.middlewares.use('/api/verify-payment', async (req, res) => {
        console.log('[/api/verify-payment] Received request:', req.method);

        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, error: 'Method not allowed' }));
        }

        try {
          let body = '';
          for await (const chunk of req) {
            body += chunk;
          }
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = JSON.parse(body);

          console.log('[/api/verify-payment] Verifying payment with order:', razorpay_order_id, 'payment:', razorpay_payment_id);

          if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ success: false, error: 'Missing required fields' }));
          }

          const hmac = crypto.createHmac('sha256', env.RAZORPAY_KEY_SECRET || '');
          hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
          const generatedSignature = hmac.digest('hex');

          const isSignatureValid = generatedSignature === razorpay_signature;

          if (!isSignatureValid) {
            console.error('[/api/verify-payment] Invalid signature');
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ success: false, error: 'Invalid payment signature' }));
          }

          console.log('[/api/verify-payment] Payment verified successfully');

          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: true, message: 'Payment verified' }));
        } catch (error) {
          console.error('[/api/verify-payment] Error:', error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, error: 'Failed to verify payment' }));
        }
      });
    },
  };
}
