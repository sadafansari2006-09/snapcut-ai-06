import logo from "@/assets/snapcut-logo.asset.json";
import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/60">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <div className="flex items-center gap-2">
          <img src={logo.url} alt="" className="h-7 w-7" />
          <span className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SnapCut AI &middot; Remove backgrounds in one click
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground sm:justify-end">
          <Link to="/website-link" className="hover:text-foreground">Website</Link>
          <Link to="/privacy-policy" className="hover:text-foreground">Privacy</Link>
          <Link to="/terms-and-conditions" className="hover:text-foreground">Terms</Link>
          <Link to="/refund-policy" className="hover:text-foreground">Refund</Link>
          <Link to="/shipping-delivery" className="hover:text-foreground">Shipping</Link>
          <Link to="/contact-us" className="hover:text-foreground">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
