import { Button } from "@/components/ui/button";

export function ContactUs() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <div className="glass rounded-3xl p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-secondary">Contact Us</p>
            <h1 className="mt-4 text-4xl font-bold">SnapCut AI Support</h1>
          </div>
          <Button asChild>
            <a href="#/" className="text-sm">Back to home</a>
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6 text-sm leading-7 text-muted-foreground">
            <p>
              If you have questions about payments, service delivery, or your account, we’re here to help.
            </p>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Trade name</h2>
              <p>SnapCut AI Private Limited</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Email</h2>
              <p>support@snapcut.ai</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Phone</h2>
              <p>+91 98765 43210</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Address</h2>
              <p>3rd Floor, Pixel House, 24 Creative Avenue, Bangalore, Karnataka 560001, India</p>
            </div>
          </div>
          <div className="rounded-3xl border border-border/80 bg-background/80 p-6 text-sm leading-7 text-muted-foreground">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Business hours</h2>
            <p>Monday – Friday: 10:00 AM – 7:00 PM IST</p>
            <p className="mt-6">
              For urgent issues with Razorpay payments, please include your order reference and the email you used when purchasing. We usually respond within one business day.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
