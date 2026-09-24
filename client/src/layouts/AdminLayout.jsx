import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { LayoutDashboard, Package, ListOrdered, Users, Tag, Menu, X, ExternalLink } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ListOrdered },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/coupons", label: "Coupons", icon: Tag },
];

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const Sidebar = (
    <div className="h-full flex flex-col bg-burgundy-dark text-ivory p-6 w-64">
      <Link to="/" className="font-display text-xl tracking-[0.15em] mb-10 block">ÉLORIA</Link>
      <nav className="flex flex-col gap-1">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                isActive ? "bg-gold text-burgundy-dark font-medium" : "text-ivory/75 hover:bg-ivory/10"
              }`
            }
          >
            <l.icon size={16} /> {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto pt-6 border-t border-ivory/10 text-xs text-ivory/50">
        <p>{user?.name}</p>
        <div className="flex items-center gap-3 mt-3">
          <Link to="/" className="flex items-center gap-1 hover:text-ivory"><ExternalLink size={12} /> View Site</Link>
          <button onClick={logout} className="hover:text-ivory">Logout</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-ivory">
      <div className="hidden lg:block shrink-0">{Sidebar}</div>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0">{Sidebar}</div>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="lg:hidden flex items-center justify-between px-5 h-16 border-b border-charcoal/10 bg-ivory">
          <button onClick={() => setOpen(true)} aria-label="Open admin menu"><Menu size={20} /></button>
          <span className="font-display text-lg text-burgundy-dark">ÉLORIA Admin</span>
          <span className="w-5" />
        </div>
        <div className="p-5 sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
