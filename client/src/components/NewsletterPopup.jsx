import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useToast } from "../context/ToastContext";

const DISMISS_KEY = "eloria_newsletter_dismissed";

export default function NewsletterPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY)) return;
    const timer = setTimeout(() => setShow(true), 9000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem(DISMISS_KEY, "1");
  };

  const submit = (e) => {
    e.preventDefault();
    showToast?.("You're on the list");
    dismiss();
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-burgundy-dark/50 z-[110]"
            onClick={dismiss}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[120] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-md bg-ivory p-8 sm:p-10 text-center"
          >
            <button onClick={dismiss} aria-label="Close" className="absolute top-4 right-4">
              <X size={18} />
            </button>
            <p className="eyebrow">ÉLORIA</p>
            <h3 className="font-display text-2xl sm:text-3xl text-burgundy-dark mt-3 leading-snug">
              A Little Something For Your Inbox
            </h3>
            <p className="text-sm text-charcoal/60 mt-3">
              Be the first to discover new fragrances, stories and exclusive offers.
            </p>
            <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="input-lux text-center"
              />
              <button type="submit" className="btn-gold w-full">Join Éloria</button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
