import { Button } from "@/components/ui/button";

export function TermsConditions() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <div className="glass rounded-3xl p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-secondary">Terms & Conditions</p>
            <h1 className="mt-4 text-4xl font-bold">SnapCut AI Terms of Service</h1>
          </div>
          <Button asChild>
            <a href="#/" className="text-sm">Back to home</a>
          </Button>
        </div>

        <section className="space-y-6 text-sm leading-7 text-muted-foreground">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Acceptance of terms</h2>
            <p>
              By using SnapCut AI, you agree to these terms and any policies referenced here. The service is provided by SnapCut AI Private Limited.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">Service usage</h2>
            <p>
              SnapCut AI provides automated background removal for images. You are responsible for ensuring the images you upload do not violate any copyright or privacy rights.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">Payment and billing</h2>
            <p>
              Payments are collected securely through Razorpay. Your subscription or purchase is activated after successful payment confirmation.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">Refunds and cancellations</h2>
            <p>
              Refund and cancellation requests are handled as described on our Refund & Cancellation page. We review claims individually and may deny refunds if the service has already been consumed.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">Limitation of liability</h2>
            <p>
              SnapCut AI is not liable for indirect damages, lost revenue, or losses arising from use of the service. Our liability is limited to the amount paid for the specific purchase.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
