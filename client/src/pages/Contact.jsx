import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";
import { useToast } from "../context/ToastContext";

export default function Contact() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e) => {
    e.preventDefault();
    showToast?.("Message sent — we'll be in touch soon");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="container-lux py-10 sm:py-14">
      <Breadcrumb items={[{ label: "Contact" }]} />
      <div className="mt-6 mb-12 max-w-xl">
        <p className="eyebrow mb-3">Get In Touch</p>
        <h1 className="section-heading">We'd Love to Hear From You</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
        <form onSubmit={submit} className="space-y-4 max-w-md">
          <input className="input-lux" required placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="input-lux" type="email" required placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <textarea className="input-lux" rows={5} required placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          <button className="btn-primary">Send Message</button>
        </form>

        <div className="space-y-6 bg-beige/30 p-7 h-fit">
          <div className="flex items-start gap-3">
            <Mail size={17} className="text-gold-dark mt-0.5" />
            <div>
              <p className="text-xs uppercase tracking-widest2 text-charcoal/50">Email</p>
              <p className="text-sm text-charcoal/80">care@eloria.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={17} className="text-gold-dark mt-0.5" />
            <div>
              <p className="text-xs uppercase tracking-widest2 text-charcoal/50">Phone</p>
              <p className="text-sm text-charcoal/80">+91 98765 43210</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={17} className="text-gold-dark mt-0.5" />
            <div>
              <p className="text-xs uppercase tracking-widest2 text-charcoal/50">Atelier</p>
              <p className="text-sm text-charcoal/80">Bandra West, Mumbai, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
