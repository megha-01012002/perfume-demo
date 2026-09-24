import { TrendingUp, Package, Users, ShoppingBag, Percent } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { products } from "../../data/products";

const revenueTrend = [
  { month: "May", revenue: 812000 },
  { month: "Jun", revenue: 945000 },
  { month: "Jul", revenue: 890000 },
  { month: "Aug", revenue: 1120000 },
  { month: "Sep", revenue: 1050000 },
  { month: "Oct", revenue: 1240000 },
  { month: "Nov", revenue: 1284500 },
];

const bestSellers = products
  .filter((p) => p.isBestseller)
  .map((p) => ({ name: p.name, units: Math.floor(40 + Math.random() * 60) }));

const stats = [
  { label: "Total Revenue", value: "₹12,84,500", icon: TrendingUp },
  { label: "Orders", value: "348", icon: ShoppingBag },
  { label: "Customers", value: "1,240", icon: Users },
  { label: "Products", value: "24", icon: Package },
  { label: "Conversion Rate", value: "4.8%", icon: Percent },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-display text-2xl sm:text-3xl text-burgundy-dark mb-1">Dashboard</h1>
      <p className="text-charcoal/55 text-sm mb-8">Welcome back. Here's how ÉLORIA is performing.</p>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-charcoal/10 p-5">
            <s.icon size={18} className="text-gold-dark mb-3" />
            <p className="text-xl font-display text-burgundy-dark">{s.value}</p>
            <p className="text-xs text-charcoal/50 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-charcoal/10 p-6">
          <h3 className="text-sm uppercase tracking-widest2 text-charcoal/60 mb-5">Revenue (Last 7 Months)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={revenueTrend}>
              <CartesianGrid stroke="#E9E0D3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#a89a89" />
              <YAxis tick={{ fontSize: 11 }} stroke="#a89a89" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />
              <Line type="monotone" dataKey="revenue" stroke="#3B1018" strokeWidth={2} dot={{ r: 3, fill: "#C8A96B" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-charcoal/10 p-6">
          <h3 className="text-sm uppercase tracking-widest2 text-charcoal/60 mb-5">Best-Selling Products</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={bestSellers} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid stroke="#E9E0D3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="#a89a89" />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={100} stroke="#a89a89" />
              <Tooltip />
              <Bar dataKey="units" fill="#C8A96B" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
