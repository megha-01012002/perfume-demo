import { Link } from "react-router-dom";
import { useState } from "react";
import { Instagram, Facebook, MapPin } from "lucide-react";
import { useToast } from "../context/ToastContext";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Fragrances", to: "/shop" },
      { label: "Women", to: "/shop?gender=Women" },
      { label: "Men", to: "/shop?gender=Men" },
      { label: "Unisex", to: "/shop?gender=Unisex" },
      { label: "Bestsellers", to: "/shop?filter=bestseller" },
      { label: "New Arrivals", to: "/shop?filter=new" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", to: "/about" },
      { label: "Journal", to: "/journal" },
      { label: "Contact", to: "/contact" },
      { label: "Careers", to: "/contact" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Shipping", to: "/contact" },
      { label: "Returns", to: "/contact" },
      { label: "FAQ", to: "/contact" },
      { label: "Privacy Policy", to: "/contact" },
      { label: "Terms", to: "/contact" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const subscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    showToast?.("You're on the list");
    setEmail("");
  };

  return (
    <footer className="bg-burgundy-dark text-ivory mt-24">
      <div className="container-lux py-16 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.3fr] gap-12">
        <div>
          <Link to="/" className="font-display text-2xl tracking-[0.15em]">
            ÉLORIA
          </Link>
          <p className="mt-4 text-sm text-ivory/60 italic font-display">"A scent worth remembering."</p>
          <div className="flex items-center gap-4 mt-6">
            <a href="#" aria-label="Instagram" className="text-ivory/70 hover:text-gold transition-colors">
              <Instagram size={17} />
            </a>
            <a href="#" aria-label="Facebook" className="text-ivory/70 hover:text-gold transition-colors">
              <Facebook size={17} />
            </a>
            <a href="#" aria-label="Pinterest" className="text-ivory/70 hover:text-gold transition-colors">
              <MapPin size={17} />
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs uppercase tracking-widest2 text-gold mb-5">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-ivory/70 hover:text-ivory transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-xs uppercase tracking-widest2 text-gold mb-4">Join the Éloria World</h4>
          <p className="text-sm text-ivory/60 mb-4">
            Receive fragrance stories, new launches and exclusive offers.
          </p>
          <form onSubmit={subscribe} className="flex border-b border-ivory/30 focus-within:border-gold transition-colors">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="bg-transparent flex-1 py-2.5 text-sm placeholder:text-ivory/40 outline-none"
            />
            <button type="submit" className="text-xs uppercase tracking-widest2 text-gold shrink-0">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-ivory/10 py-6">
        <div className="container-lux flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-ivory/40">
          <span>&copy; {new Date().getFullYear()} ÉLORIA. All rights reserved.</span>
          <span>Crafted for the moments that stay.</span>
        </div>
      </div>
    </footer>
  );
}
