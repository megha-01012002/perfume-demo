import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="border-t border-charcoal/15">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.title} className="border-b border-charcoal/15">
            <button
              onClick={() => setOpenIndex(open ? -1 : i)}
              className="w-full flex items-center justify-between py-4 text-left"
            >
              <span className="text-sm font-medium uppercase tracking-wide text-burgundy-dark">
                {item.title}
              </span>
              {open ? <Minus size={15} /> : <Plus size={15} />}
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-5 text-sm text-charcoal/70 leading-relaxed">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
