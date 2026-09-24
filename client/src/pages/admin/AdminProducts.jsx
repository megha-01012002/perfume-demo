import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { products as seedProducts } from "../../data/products";
import ProductArt from "../../components/ProductArt";
import { useToast } from "../../context/ToastContext";

export default function AdminProducts() {
  const [products, setProducts] = useState(seedProducts);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { showToast } = useToast();

  const openNew = () => {
    setEditing({
      id: `new-${Date.now()}`,
      name: "",
      category: "Eau de Parfum",
      gender: "Unisex",
      price: 0,
      tone: "#3B1018",
      accent: "#C8A96B",
      sizes: [{ size: "50ml", stock: 10 }],
      isFeatured: false,
      isBestseller: false,
      isNew: true,
    });
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditing({ ...p });
    setShowForm(true);
  };

  const remove = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast?.("Product deleted");
  };

  const save = (e) => {
    e.preventDefault();
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === editing.id);
      return exists ? prev.map((p) => (p.id === editing.id ? editing : p)) : [editing, ...prev];
    });
    showToast?.("Product saved");
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl text-burgundy-dark">Products</h1>
          <p className="text-charcoal/55 text-sm mt-1">{products.length} products in catalog</p>
        </div>
        <button onClick={openNew} className="btn-primary"><Plus size={14} className="mr-1" /> Add Product</button>
      </div>

      <div className="bg-white border border-charcoal/10 overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="border-b border-charcoal/10 text-left text-xs uppercase tracking-widest2 text-charcoal/50">
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4">Tags</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const totalStock = p.sizes.reduce((s, sz) => s + sz.stock, 0);
              return (
                <tr key={p.id} className="border-b border-charcoal/5 last:border-0">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <div className="w-10 h-12 bg-beige/40 shrink-0"><ProductArt tone={p.tone} accent={p.accent} variant={1} /></div>
                    <span className="font-medium text-burgundy-dark">{p.name}</span>
                  </td>
                  <td className="py-3 px-4 text-charcoal/60">{p.category}</td>
                  <td className="py-3 px-4">₹{p.price.toLocaleString("en-IN")}</td>
                  <td className="py-3 px-4">
                    <span className={totalStock <= 10 ? "text-burgundy font-medium" : ""}>{totalStock}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1 flex-wrap">
                      {p.isBestseller && <span className="text-[10px] bg-gold/20 text-gold-dark px-2 py-0.5">Bestseller</span>}
                      {p.isNew && <span className="text-[10px] bg-beige text-charcoal/60 px-2 py-0.5">New</span>}
                      {p.isFeatured && <span className="text-[10px] bg-burgundy/10 text-burgundy px-2 py-0.5">Featured</span>}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => openEdit(p)} aria-label="Edit product" className="text-charcoal/50 hover:text-burgundy"><Pencil size={15} /></button>
                      <button onClick={() => remove(p.id)} aria-label="Delete product" className="text-charcoal/50 hover:text-burgundy"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowForm(false)} />
          <form onSubmit={save} className="relative bg-ivory w-full max-w-md p-7 max-h-[90vh] overflow-y-auto">
            <button type="button" onClick={() => setShowForm(false)} className="absolute top-4 right-4"><X size={18} /></button>
            <h2 className="font-display text-xl text-burgundy-dark mb-5">{editing.name ? "Edit Product" : "Add Product"}</h2>
            <div className="space-y-3">
              <input required className="input-lux" placeholder="Product Name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <select className="input-lux" value={editing.gender} onChange={(e) => setEditing({ ...editing, gender: e.target.value })}>
                  <option>Women</option><option>Men</option><option>Unisex</option>
                </select>
                <input required type="number" className="input-lux" placeholder="Price (₹)" value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} />
              </div>
              <div className="flex items-center gap-5 pt-1">
                {["isFeatured", "isBestseller", "isNew"].map((k) => (
                  <label key={k} className="flex items-center gap-2 text-xs text-charcoal/70">
                    <input type="checkbox" checked={editing[k]} onChange={(e) => setEditing({ ...editing, [k]: e.target.checked })} className="accent-burgundy" />
                    {k.replace("is", "")}
                  </label>
                ))}
              </div>
            </div>
            <button className="btn-primary w-full mt-6">Save Product</button>
          </form>
        </div>
      )}
    </div>
  );
}
