import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Search, User, Heart, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { to: "/shop", label: "Shop" },
  { to: "/collections", label: "Collections" },
  { to: "/about", label: "About" },
  { to: "/journal", label: "Journal" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { itemCount, setDrawerOpen: setCartDrawer } = useCart();
  const { productIds } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen || searchOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [drawerOpen, searchOpen]);

  const submitSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-lux ${
          scrolled ? "bg-ivory/95 backdrop-blur-sm shadow-card" : "bg-transparent"
        }`}
      >
        <div className="container-lux flex items-center justify-between h-[76px]">
          <button
            className="lg:hidden text-burgundy-dark"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <Link to="/" className="font-display text-2xl sm:text-[26px] tracking-[0.15em] text-burgundy-dark">
            ÉLORIA
          </Link>

          <nav className="hidden lg:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-xs uppercase tracking-widest2 transition-colors ${
                    isActive ? "text-burgundy" : "text-charcoal/80 hover:text-burgundy"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4 sm:gap-5">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="text-charcoal hover:text-burgundy transition-colors"
            >
              <Search size={19} />
            </button>
            <Link
              to={user ? "/account" : "/login"}
              aria-label="Account"
              className="hidden sm:inline-flex text-charcoal hover:text-burgundy transition-colors"
            >
              <User size={19} />
            </Link>
            <Link to="/wishlist" aria-label="Wishlist" className="relative text-charcoal hover:text-burgundy transition-colors">
              <Heart size={19} />
              {productIds.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-burgundy text-ivory text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {productIds.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setCartDrawer(true)}
              aria-label="Bag"
              className="relative text-charcoal hover:text-burgundy transition-colors flex items-center gap-1.5"
            >
              <ShoppingBag size={19} />
              <span className="hidden sm:inline text-xs uppercase tracking-widest2">Bag ({itemCount})</span>
              {itemCount > 0 && (
                <span className="sm:hidden absolute -top-2 -right-2 bg-burgundy text-ivory text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-burgundy-dark/50 z-[60]"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 bottom-0 w-[82%] max-w-sm bg-ivory z-[70] p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-display text-xl tracking-widest text-burgundy-dark">ÉLORIA</span>
                <button onClick={() => setDrawerOpen(false)} aria-label="Close menu">
                  <X size={22} />
                </button>
              </div>
              <nav className="flex flex-col gap-6">
                {navLinks.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setDrawerOpen(false)}
                    className="font-display text-2xl text-burgundy-dark"
                  >
                    {l.label}
                  </NavLink>
                ))}
                <NavLink
                  to={user ? "/account" : "/login"}
                  onClick={() => setDrawerOpen(false)}
                  className="font-display text-2xl text-burgundy-dark"
                >
                  {user ? "My Account" : "Login"}
                </NavLink>
              </nav>
              <div className="mt-auto pt-8 border-t border-charcoal/10 text-xs text-charcoal/50">
                A Scent Worth Remembering.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ivory z-[80] flex flex-col"
          >
            <div className="container-lux flex items-center justify-between h-[76px]">
              <span className="font-display text-xl tracking-widest text-burgundy-dark">Search</span>
              <button onClick={() => setSearchOpen(false)} aria-label="Close search">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={submitSearch} className="container-lux mt-10 sm:mt-24">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search fragrances, notes, moods..."
                className="w-full bg-transparent border-b border-charcoal/30 focus:border-burgundy outline-none font-display text-2xl sm:text-4xl text-burgundy-dark py-4 placeholder:text-charcoal/30"
              />
              <p className="mt-4 text-xs text-charcoal/50">Try "oud", "floral", or "midnight oud"</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
