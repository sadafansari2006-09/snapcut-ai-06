import { Button } from "@/components/ui/button";

export function ShippingDelivery() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <div className="glass rounded-3xl p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-secondary">Shipping & Delivery</p>
            <h1 className="mt-4 text-4xl font-bold">Digital delivery for SnapCut AI</h1>
          </div>
          <Button asChild>
            <a href="#/" className="text-sm">Back to home</a>
          </Button>
        </div>

        <section className="space-y-6 text-sm leading-7 text-muted-foreground">
          <div>
            <h2 className="text-lg font-semibold text-foreground">How delivery works</h2>
            <p>
              SnapCut AI is a digital service. Once your image is processed, the transparent PNG download link appears instantly in your browser. If you purchase Pro, your account is upgraded immediately after payment confirmation.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">No physical shipping</h2>
            <p>
              There is no shipping fee and no physical delivery. All output is delivered digitally through the web app, and any notifications are sent to your registered email.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">Download expiry</h2>
            <p>
              Processed images are available for download for 24 hours. After that window, files are deleted from our servers to protect your privacy.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">Support</h2>
            <p>
              If you do not receive your processed file or payment confirmation, contact support@snapcut.ai and include your transaction ID from Razorpay.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
