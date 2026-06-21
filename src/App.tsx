import { Routes, Route } from "react-router-dom";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Toaster } from "@/components/ui/sonner";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PageTransition } from "@/components/PageTransition";
import { AuthProvider } from "@/context/AuthContext";

import { ContactUs } from "@/pages/ContactUs";
import { Dashboard } from "@/pages/Dashboard";
import { HomePage } from "@/pages/HomePage";
import { PrivacyPolicy } from "@/pages/PrivacyPolicy";
import { RefundPolicy } from "@/pages/RefundPolicy";
import { ShippingDelivery } from "@/pages/ShippingDelivery";
import { TermsConditions } from "@/pages/TermsConditions";
import { WebsiteLink } from "@/pages/WebsiteLink";
import { Login } from "@/pages/Login";
import { Signup } from "@/pages/Signup";

function App() {
  return (
    <AuthProvider>
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
            path="/login"
            element={
              <PageTransition>
                <Login />
              </PageTransition>
            }
          />

          <Route
            path="/signup"
            element={
              <PageTransition>
                <Signup />
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
    </AuthProvider>
  );
}

export default App;