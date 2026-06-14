import { Button } from "@/components/ui/button";

export function RefundPolicy() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <div className="glass rounded-3xl p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-secondary">Refund Policy</p>
            <h1 className="mt-4 text-4xl font-bold">SnapCut AI Refund Policy</h1>
            <p className="mt-2 text-sm text-muted-foreground">Last updated: June 14, 2026</p>
          </div>
          <Button asChild>
            <a href="#/" className="text-sm">Back to home</a>
          </Button>
        </div>

        <section className="space-y-6 text-sm leading-7 text-muted-foreground">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Subscription cancellations</h2>
            <p>
              SnapCut AI Pro is billed monthly at ₹499. You may cancel anytime before the next renewal date to avoid being charged for the following month.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">Refund eligibility</h2>
            <p>
              Refunds are issued only for unused subscriptions within 7 days of purchase. If you have accessed the Pro benefits or used the service, refund requests are reviewed case by case.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">How to request a refund</h2>
            <p>
              Email support@snapcut.ai with your order reference and account email. We will respond within 48 hours and help resolve payment issues.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">Dispute resolution</h2>
            <p>
              Razorpay handles the payment transaction, while SnapCut AI manages service fulfillment. If you need help, contact us directly for a quick resolution.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
