import { Button } from "@/components/ui/button";

export function RefundCancellation() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <div className="glass rounded-3xl p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-secondary">Refund & Cancellation</p>
            <h1 className="mt-4 text-4xl font-bold">SnapCut AI Refund Policy</h1>
          </div>
          <Button asChild>
            <a href="#/" className="text-sm">Back to home</a>
          </Button>
        </div>

        <section className="space-y-6 text-sm leading-7 text-muted-foreground">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Monthly Pro subscription</h2>
            <p>
              SnapCut AI Pro is billed monthly at ₹499. You may cancel anytime before the next renewal date to avoid the next charge.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">Refunds</h2>
            <p>
              Refunds are offered only for unused subscriptions within 7 days of the purchase date. If you have used the Pro plan or consumed credits, we reserve the right to decline a refund request.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">Cancellation process</h2>
            <p>
              To cancel your Pro renewal, please contact support@snapcut.ai and allow up to 48 hours for confirmation. Cancellation is effective at the end of the current billing period.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">Charge disputes</h2>
            <p>
              Razorpay processes all payments for SnapCut AI. If you believe a payment was made in error, please contact us immediately and we will help you resolve the issue.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
