import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
// import NewsletterPopup from "../components/NewsletterPopup";
import CookieConsent from "../components/CookieConsent";

export default function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1 pt-[76px]">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      {/* <NewsletterPopup /> */}
      <CookieConsent />
    </div>
  );
}
