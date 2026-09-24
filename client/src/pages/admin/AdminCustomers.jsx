const CUSTOMERS = [
  { name: "Ananya R.", email: "ananya@example.com", orders: 4, spent: 31200 },
  { name: "Karan M.", email: "karan@example.com", orders: 2, spent: 15980 },
  { name: "Priya S.", email: "priya@example.com", orders: 6, spent: 48540 },
  { name: "Aditya V.", email: "aditya@example.com", orders: 1, spent: 9990 },
  { name: "Ritika D.", email: "ritika@example.com", orders: 3, spent: 26970 },
  { name: "Simran K.", email: "simran@example.com", orders: 5, spent: 33450 },
  { name: "Farhan A.", email: "farhan@example.com", orders: 2, spent: 23980 },
  { name: "Neha T.", email: "neha@example.com", orders: 1, spent: 8490 },
  { name: "Rahul B.", email: "rahul@example.com", orders: 3, spent: 22470 },
  { name: "Divya P.", email: "divya@example.com", orders: 7, spent: 55230 },
];

export default function AdminCustomers() {
  return (
    <div>
      <h1 className="font-display text-2xl sm:text-3xl text-burgundy-dark mb-1">Customers</h1>
      <p className="text-charcoal/55 text-sm mb-6">{CUSTOMERS.length} shown of 1,240 total customers</p>

      <div className="bg-white border border-charcoal/10 overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="border-b border-charcoal/10 text-left text-xs uppercase tracking-widest2 text-charcoal/50">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Orders</th>
              <th className="py-3 px-4">Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {CUSTOMERS.map((c) => (
              <tr key={c.email} className="border-b border-charcoal/5 last:border-0">
                <td className="py-3 px-4 font-medium text-burgundy-dark">{c.name}</td>
                <td className="py-3 px-4 text-charcoal/60">{c.email}</td>
                <td className="py-3 px-4">{c.orders}</td>
                <td className="py-3 px-4">₹{c.spent.toLocaleString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
