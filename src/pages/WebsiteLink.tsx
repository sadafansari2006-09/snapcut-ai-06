import { Button } from "@/components/ui/button";

export function WebsiteLink() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <div className="glass rounded-3xl p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-secondary">Website Link</p>
            <h1 className="mt-4 text-4xl font-bold">Visit SnapCut AI</h1>
          </div>
          <Button asChild>
            <a href="#/" className="text-sm">Back to home</a>
          </Button>
        </div>

        <p className="text-muted-foreground">
          Welcome to SnapCut AI — your one-stop online studio for fast, accurate background removal.
        </p>

        <section className="mt-10 space-y-6 text-sm leading-7 text-muted-foreground">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Official website</h2>
            <p>
              Access the full service at <a href="https://www.snapcut.ai" className="text-primary underline">https://www.snapcut.ai</a>.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">What we offer</h2>
            <p>
              SnapCut AI delivers studio-quality image background removal in seconds, with exports for JPG, PNG and WEBP, plus transparent background output.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">How to reach us</h2>
            <p>
              Use the Contact page to send questions about payments, Razorpay checkout, or service access.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
