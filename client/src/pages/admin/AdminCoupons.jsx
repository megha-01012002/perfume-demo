import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

const INITIAL = [
  { code: "ELORIA10", type: "Percent", value: "10%", minOrder: 0, active: true },
  { code: "WELCOME15", type: "Percent", value: "15%", minOrder: 5000, active: true },
  { code: "FIRSTORDER", type: "Flat", value: "₹500", minOrder: 4000, active: true },
  { code: "OUD2000", type: "Flat", value: "₹2,000", minOrder: 10000, active: false },
  { code: "SUMMER20", type: "Percent", value: "20%", minOrder: 6000, active: false },
];

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState(INITIAL);

  const toggle = (code) =>
    setCoupons((prev) => prev.map((c) => (c.code === code ? { ...c, active: !c.active } : c)));
  const remove = (code) => setCoupons((prev) => prev.filter((c) => c.code !== code));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl text-burgundy-dark">Coupons</h1>
          <p className="text-charcoal/55 text-sm mt-1">{coupons.length} coupons</p>
        </div>
        <button className="btn-primary"><Plus size={14} className="mr-1" /> New Coupon</button>
      </div>

      <div className="bg-white border border-charcoal/10 overflow-x-auto">
        <table className="w-full text-sm min-w-[560px]">
          <thead>
            <tr className="border-b border-charcoal/10 text-left text-xs uppercase tracking-widest2 text-charcoal/50">
              <th className="py-3 px-4">Code</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Value</th>
              <th className="py-3 px-4">Min. Order</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.code} className="border-b border-charcoal/5 last:border-0">
                <td className="py-3 px-4 font-medium text-burgundy-dark">{c.code}</td>
                <td className="py-3 px-4 text-charcoal/60">{c.type}</td>
                <td className="py-3 px-4">{c.value}</td>
                <td className="py-3 px-4">₹{c.minOrder.toLocaleString("en-IN")}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => toggle(c.code)}
                    className={`text-xs px-2.5 py-1 ${c.active ? "bg-green-100 text-green-700" : "bg-charcoal/10 text-charcoal/50"}`}
                  >
                    {c.active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="py-3 px-4 text-right">
                  <button onClick={() => remove(c.code)} aria-label="Delete coupon" className="text-charcoal/50 hover:text-burgundy">
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
