import { toast } from "sonner";
import { Routes, Route } from "react-router-dom";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Toaster } from "@/components/ui/sonner";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PageTransition } from "@/components/PageTransition";

import { openRazorpayCheckout } from "@/lib/razorpay";

import { ContactUs } from "@/pages/ContactUs";
import { Dashboard } from "@/pages/Dashboard";
import { HomePage } from "@/pages/HomePage";
import { PrivacyPolicy } from "@/pages/PrivacyPolicy";
import { RefundPolicy } from "@/pages/RefundPolicy";
import { ShippingDelivery } from "@/pages/ShippingDelivery";
import { TermsConditions } from "@/pages/TermsConditions";
import { WebsiteLink } from "@/pages/WebsiteLink";

import logo from "@/assets/snapcut-logo.asset.json";

function App() {
  const handleCheckout = async () => {
    if (!import.meta.env.VITE_RAZORPAY_KEY_ID) {
      toast.error(
        "Razorpay key is not configured. Set VITE_RAZORPAY_KEY_ID in .env."
      );
      return;
    }

    try {
      await openRazorpayCheckout({
        amount: 49900,
        currency: "INR",
        name: "SnapCut AI",
        description: "SnapCut AI Pro monthly subscription",
        image: logo.url,
        notes: {
          plan: "Pro monthly",
          product: "SnapCut AI",
        },
        theme: {
          color: "#6c5cff",
        },
        onSuccess: () => {
          toast.success(
            "Payment successful! Thank you for upgrading to Pro."
          );
        },
        onError: () => {
          toast.error(
            "Payment was not completed. Please try again."
          );
        },
      });
    } catch (error) {
      toast.error("Unable to open Razorpay checkout.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <Toaster />
      <ScrollToTop />

      <Routes>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PageTransition>
              <Dashboard />
            </PageTransition>
          }
        />

        <Route
          path="/website-link"
          element={
            <PageTransition>
              <WebsiteLink />
            </PageTransition>
          }
        />

        <Route
          path="/privacy-policy"
          element={
            <PageTransition>
              <PrivacyPolicy />
            </PageTransition>
          }
        />

        <Route
          path="/terms-and-conditions"
          element={
            <PageTransition>
              <TermsConditions />
            </PageTransition>
          }
        />

        <Route
          path="/refund-policy"
          element={
            <PageTransition>
              <RefundPolicy />
            </PageTransition>
          }
        />

        <Route
          path="/shipping-delivery"
          element={
            <PageTransition>
              <ShippingDelivery />
            </PageTransition>
          }
        />

        <Route
          path="/contact-us"
          element={
            <PageTransition>
              <ContactUs />
            </PageTransition>
          }
        />

        <Route
          path="*"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
      </Routes>

      <SiteFooter />
    </div>
  );
}

export default App;