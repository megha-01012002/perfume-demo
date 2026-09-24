import { useEffect, useState } from "react";

const STATUS_FLOW = ["Processing", "Confirmed", "Shipped", "Out for Delivery", "Delivered"];

const DEMO_ORDERS = Array.from({ length: 10 }).map((_, i) => ({
  id: `ORD-${100000 + i}`,
  customer: ["Ananya R.", "Karan M.", "Priya S.", "Aditya V.", "Ritika D.", "Simran K.", "Farhan A.", "Neha T.", "Rahul B.", "Divya P."][i],
  date: new Date(Date.now() - i * 2 * 86400000).toLocaleDateString("en-IN"),
  total: 5990 + i * 1230,
  paymentStatus: i % 5 === 0 ? "Pending" : "Paid",
  orderStatus: STATUS_FLOW[Math.min(i % STATUS_FLOW.length, STATUS_FLOW.length - 1)],
}));

export default function AdminOrders() {
  const [orders, setOrders] = useState(DEMO_ORDERS);

  const updateStatus = (id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, orderStatus: status } : o)));
  };

  return (
    <div>
      <h1 className="font-display text-2xl sm:text-3xl text-burgundy-dark mb-1">Orders</h1>
      <p className="text-charcoal/55 text-sm mb-6">{orders.length} orders</p>

      <div className="bg-white border border-charcoal/10 overflow-x-auto">
        <table className="w-full text-sm min-w-[760px]">
          <thead>
            <tr className="border-b border-charcoal/10 text-left text-xs uppercase tracking-widest2 text-charcoal/50">
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Payment</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-charcoal/5 last:border-0">
                <td className="py-3 px-4 font-medium text-burgundy-dark">{o.id}</td>
                <td className="py-3 px-4">{o.customer}</td>
                <td className="py-3 px-4 text-charcoal/60">{o.date}</td>
                <td className="py-3 px-4">₹{o.total.toLocaleString("en-IN")}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-1 ${o.paymentStatus === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {o.paymentStatus}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <select
                    value={o.orderStatus}
                    onChange={(e) => updateStatus(o.id, e.target.value)}
                    className="text-xs border border-charcoal/20 px-2 py-1.5 focus:outline-none focus:border-burgundy"
                  >
                    {STATUS_FLOW.map((s) => <option key={s}>{s}</option>)}
                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
