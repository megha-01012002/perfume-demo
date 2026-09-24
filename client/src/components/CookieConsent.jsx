import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const KEY = "eloria_cookie_consent";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setShow(true);
  }, []);

  const respond = (value) => {
    localStorage.setItem(KEY, value);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 inset-x-0 z-[95] bg-charcoal text-ivory"
        >
          <div className="container-lux py-4 flex flex-col sm:flex-row items-center gap-4 justify-between">
            <p className="text-xs sm:text-sm text-ivory/80 text-center sm:text-left">
              We use cookies to enhance your experience on ÉLORIA. See our Privacy Policy to learn more.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button onClick={() => respond("managed")} className="text-xs uppercase tracking-widest2 text-ivory/60 hover:text-ivory">
                Manage Preferences
              </button>
              <button onClick={() => respond("accepted")} className="bg-gold text-burgundy-dark text-xs uppercase tracking-widest2 px-5 py-2.5 font-semibold">
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
