import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Zap, Shield, Image as ImageIcon, Code2, CreditCard, Check, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { UploadDemo } from "@/components/UploadDemo";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import logo from "@/assets/snapcut-logo.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SnapCut AI ΓÇö Remove backgrounds in one click" },
      { name: "description", content: "AI-powered background removal. Drop an image, get a transparent PNG in seconds." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Zap, title: "Sub-5s processing", body: "Pixel-perfect cutouts in under five seconds, powered by best-in-class AI." },
  { icon: ImageIcon, title: "Up to 5000├ù5000", body: "High-resolution exports. JPG, PNG and WEBP in, transparent PNG out." },
  { icon: Shield, title: "Auto-deletes in 24h", body: "We never keep your images. Encrypted in transit, purged automatically." },
  { icon: Code2, title: "Developer API", body: "Plug background removal into your stack with one POST request." },
  { icon: CreditCard, title: "Fair pricing", body: "5 free per day. Unlimited Pro. Bulk credit packs for teams." },
  { icon: Sparkles, title: "Studio-grade edges", body: "Hair, fur, glass ΓÇö our model handles the hard stuff cleanly." },
];

const tiers = [
  { name: "Free", price: "Γé╣0", period: "/mo", desc: "Try it out, no card required.", features: ["5 images / day", "Up to 5MP exports", "Standard queue"], cta: "Start free" },
  { name: "Pro", price: "Γé╣499", period: "/mo", desc: "For creators and sellers.", features: ["Unlimited images", "Up to 25MP exports", "Priority queue", "API access (1k/mo)"], cta: "Upgrade to Pro", featured: true },
  { name: "Business", price: "Γé╣2,499", period: "/mo", desc: "Bulk, teams, automation.", features: ["Everything in Pro", "10k API calls/mo", "Team seats", "Webhooks & SLA"], cta: "Contact sales" },
];

function Landing() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <Toaster />

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-24 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-secondary" />
              AI background removal &middot; built for production
            </div>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Remove backgrounds<br />
              <span className="text-gradient-brand">in one click.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              SnapCut AI turns any photo into a clean, transparent PNG in seconds.
              For creators, e-commerce sellers, and product teams who need pixel-perfect cutouts at scale.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="hero" size="lg">
                Try it free <ArrowRight />
              </Button>
              <Button variant="glass" size="lg">View pricing</Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
              <div><span className="font-semibold text-foreground">5s</span> avg. processing</div>
              <div><span className="font-semibold text-foreground">99.5%</span> uptime</div>
              <div><span className="font-semibold text-foreground">24h</span> auto-delete</div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-brand-soft blur-3xl" />
            <UploadDemo />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Built to be the <span className="text-gradient-brand">last</span> background tool you'll need
          </h2>
          <p className="mt-4 text-muted-foreground">
            Fast, accurate, private. Designed for production workloads from day one.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="glass group rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-glow">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand-soft text-secondary ring-1 ring-border">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="mx-auto max-w-7xl px-6 py-20">
        <div className="glass rounded-3xl p-10">
          <div className="grid gap-10 lg:grid-cols-3">
            {[
              { n: "01", t: "Upload", d: "Drag in a JPG, PNG or WEBP. Up to 10MB." },
              { n: "02", t: "Process", d: "Our AI isolates the subject with studio-quality edges." },
              { n: "03", t: "Download", d: "Grab a transparent PNG. Use anywhere, instantly." },
            ].map((s) => (
              <div key={s.n}>
                <div className="font-display text-5xl font-bold text-gradient-brand">{s.n}</div>
                <h3 className="mt-3 font-display text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Simple, scalable pricing</h2>
          <p className="mt-4 text-muted-foreground">Start free. Upgrade when you grow.</p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`glass relative rounded-2xl p-8 ${t.featured ? "shadow-glow ring-1 ring-primary/40" : ""}`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-primary-foreground shadow-glow">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-xl font-semibold">{t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold">{t.price}</span>
                <span className="text-muted-foreground">{t.period}</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button variant={t.featured ? "hero" : "glass"} className="mt-8 w-full">
                {t.cta}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* API CTA */}
      <section id="api" className="mx-auto max-w-7xl px-6 py-20">
        <div className="glass overflow-hidden rounded-3xl p-10 lg:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                <Code2 className="h-3.5 w-3.5" /> For developers
              </div>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight">One endpoint. Transparent PNGs.</h2>
              <p className="mt-4 text-muted-foreground">
                Drop SnapCut into any backend. Get an API key, POST an image, receive a transparent result. Rate limits, webhooks, and usage analytics included.
              </p>
              <div className="mt-6 flex gap-3">
                <Button variant="hero">Get an API key</Button>
                <Button variant="glass">Read docs</Button>
              </div>
            </div>
            <pre className="overflow-x-auto rounded-xl border border-border bg-background/80 p-5 text-xs leading-relaxed text-muted-foreground">
{`curl -X POST https://api.snapcut.ai/v1/remove \\
  -H "Authorization: Bearer sk_live_..." \\
  -F "image=@photo.jpg"

{
  "id": "img_8af2...",
  "url": "https://cdn.snapcut.ai/out/8af2.png",
  "ms": 2384,
  "expires_at": "2026-06-07T21:00:00Z"
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <img src={logo.url} alt="" className="mx-auto h-16 w-16" />
        <h2 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Ready to cut the background?
        </h2>
        <p className="mt-4 text-muted-foreground">Your first 5 images are on us. No credit card.</p>
        <Button variant="hero" size="lg" className="mt-8">
          Start removing backgrounds <ArrowRight />
        </Button>
      </section>

      <SiteFooter />
    </div>
  );
}
