import logo from "@/assets/snapcut-logo.asset.json";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const sectionLinks = [
  { label: "Features", hash: "#features" },
  { label: "How it works", hash: "#how" },
  { label: "Pricing", hash: "#pricing" },
  { label: "API", hash: "#api" },
];

export function SiteHeader() {
  const { pathname } = useLocation();

  const handleSectionClick = (hash: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      event.preventDefault();
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", hash);
      }
    }
  };

  return (
    <header className="w-full">
      <div className="sticky top-0 z-40 border-b border-border/50 bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo.url}
              alt="SnapCut AI"
              className="h-[42px] sm:h-[56px] w-auto object-contain drop-shadow-[0_0_20px_rgba(96,99,255,0.25)]"
            />
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            {sectionLinks.map((link) => (
              <Link
                key={link.hash}
                to={{ pathname: "/", hash: link.hash }}
                onClick={handleSectionClick(link.hash)}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link to="/website-link" className="hover:text-foreground transition-colors">Website</Link>
            <Link to="/contact-us" className="hover:text-foreground transition-colors">Contact</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign in</Button>
            <Button asChild variant="hero" size="sm">
              <Link to="/dashboard">Get started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
