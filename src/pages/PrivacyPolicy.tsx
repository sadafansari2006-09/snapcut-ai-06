import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <div className="glass rounded-3xl p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-secondary">Privacy Policy</p>
            <h1 className="mt-4 text-4xl font-bold">SnapCut AI Privacy Commitment</h1>
          </div>
          <Button asChild>
            <a href="#/" className="text-sm">Back to home</a>
          </Button>
        </div>

        <p className="text-muted-foreground">
          SnapCut AI Private Limited respects your privacy and only collects the information needed to provide fast, reliable background removal services.
        </p>

        <section className="mt-10 space-y-6 text-sm leading-7 text-muted-foreground">
          <div>
            <h2 className="text-lg font-semibold text-foreground">What we collect</h2>
            <p>
              We collect your email address and payment metadata to process purchases through Razorpay, and the images you upload for background removal.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">How we use your data</h2>
            <p>
              Files are processed, then automatically deleted after 24 hours. Payment details are handled directly by Razorpay; we never store card or UPI credentials on our servers.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">Razorpay checkout</h2>
            <p>
              Payments for SnapCut AI Pro are collected through Razorpay. The checkout popup is served from Razorpay’s secure payment gateway and uses a stored key ID from our environment configuration.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">Cookies and analytics</h2>
            <p>
              We use minimal browser storage to keep the session active while you work. We do not sell user data or use it for advertising.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">Contact</h2>
            <p>
              For any privacy questions, contact support@snapcut.ai.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
