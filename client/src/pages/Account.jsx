import { NavLink, Routes, Route, Link } from "react-router-dom";
import { User, Package, Heart, MapPin, Settings, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { orderService } from "../services/orderService";
import Breadcrumb from "../components/Breadcrumb";

const tabs = [
  { to: "/account", label: "Profile", icon: User, end: true },
  { to: "/account/orders", label: "Orders", icon: Package },
  { to: "/account/wishlist", label: "Wishlist", icon: Heart },
  { to: "/account/addresses", label: "Addresses", icon: MapPin },
  { to: "/account/settings", label: "Account Settings", icon: Settings },
];

function ProfileTab() {
  const { user } = useAuth();
  return (
    <div className="max-w-sm space-y-4">
      <h2 className="font-display text-2xl text-burgundy-dark mb-4">Profile</h2>
      <input className="input-lux" defaultValue={user?.name} readOnly />
      <input className="input-lux" defaultValue={user?.email} readOnly />
      <input className="input-lux" defaultValue={user?.phone} readOnly />
      <p className="text-xs text-charcoal/45">This is a read-only demo profile view.</p>
    </div>
  );
}

function OrdersTab() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderService.getOrdersForUser(user?.id).then((o) => {
      setOrders(o);
      setLoading(false);
    });
  }, [user]);

  if (loading) return <p className="text-charcoal/50 text-sm">Loading orders…</p>;

  if (orders.length === 0) {
    return (
      <div>
        <h2 className="font-display text-2xl text-burgundy-dark mb-4">Order History</h2>
        <p className="text-charcoal/60 text-sm">No orders yet. Once you place an order, it'll show up here.</p>
        <Link to="/shop" className="btn-primary mt-5 inline-flex">Shop Now</Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-2xl text-burgundy-dark mb-5">Order History</h2>
      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="border border-charcoal/10 p-5">
            <div className="flex flex-wrap justify-between gap-2 mb-2">
              <span className="font-medium text-burgundy-dark text-sm">{o.id}</span>
              <span className="text-xs text-charcoal/50">{new Date(o.createdAt).toLocaleDateString("en-IN")}</span>
            </div>
            <p className="text-xs text-charcoal/50 mb-2">{o.items.length} item(s)</p>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest2 text-gold-dark">{o.orderStatus}</span>
              <span className="font-medium text-burgundy-dark">₹{o.totals.total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WishlistTab() {
  const { productIds } = useWishlist();
  const items = products.filter((p) => productIds.includes(p.id));
  return (
    <div>
      <h2 className="font-display text-2xl text-burgundy-dark mb-5">Wishlist</h2>
      {items.length === 0 ? (
        <p className="text-charcoal/60 text-sm">Your wishlist is empty. <Link to="/shop" className="text-burgundy">Explore fragrances</Link></p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}

function AddressesTab() {
  return (
    <div>
      <h2 className="font-display text-2xl text-burgundy-dark mb-4">Addresses</h2>
      <p className="text-charcoal/60 text-sm">Addresses you use at checkout will appear here for faster ordering.</p>
    </div>
  );
}

function SettingsTab() {
  const { logout } = useAuth();
  return (
    <div>
      <h2 className="font-display text-2xl text-burgundy-dark mb-4">Account Settings</h2>
      <p className="text-charcoal/60 text-sm mb-6">Manage your notification and communication preferences.</p>
      <button onClick={logout} className="btn-secondary">Logout</button>
    </div>
  );
}

export default function Account() {
  const { user, logout } = useAuth();

  return (
    <div className="container-lux py-10 sm:py-14">
      <Breadcrumb items={[{ label: "My Account" }]} />
      <h1 className="font-display text-3xl sm:text-4xl text-burgundy-dark mt-6 mb-2">My Account</h1>
      <p className="text-charcoal/60 mb-10">Welcome back, {user?.name}.</p>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
        <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
          {tabs.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-4 py-2.5 text-sm whitespace-nowrap ${
                  isActive ? "bg-burgundy text-ivory" : "text-charcoal/70 hover:bg-beige/50"
                }`
              }
            >
              <t.icon size={15} /> {t.label}
            </NavLink>
          ))}
          <button onClick={logout} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-charcoal/70 hover:bg-beige/50 whitespace-nowrap">
            <LogOut size={15} /> Logout
          </button>
        </nav>

        <div>
          <Routes>
            <Route index element={<ProfileTab />} />
            <Route path="orders" element={<OrdersTab />} />
            <Route path="wishlist" element={<WishlistTab />} />
            <Route path="addresses" element={<AddressesTab />} />
            <Route path="settings" element={<SettingsTab />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
