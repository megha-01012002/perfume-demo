import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await register(form);
      navigate("/account");
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-lux py-16 sm:py-24 flex justify-center">
      <div className="w-full max-w-sm">
        <p className="eyebrow text-center mb-3">Join ÉLORIA</p>
        <h1 className="font-display text-3xl text-burgundy-dark text-center mb-8">Create Account</h1>

        <form onSubmit={submit} className="space-y-4">
          <input className="input-lux" required placeholder="Full Name" value={form.name} onChange={set("name")} />
          <input className="input-lux" type="email" required placeholder="Email" value={form.email} onChange={set("email")} />
          <input className="input-lux" required placeholder="Phone" value={form.phone} onChange={set("phone")} />
          <input className="input-lux" type="password" required placeholder="Password" value={form.password} onChange={set("password")} />
          <input className="input-lux" type="password" required placeholder="Confirm Password" value={form.confirm} onChange={set("confirm")} />
          {error && <p className="text-sm text-burgundy">{error}</p>}
          <button disabled={loading} className="btn-primary w-full">{loading ? "Creating account…" : "Register"}</button>
        </form>

        <p className="text-center text-sm text-charcoal/60 mt-6">
          Already have an account? <Link to="/login" className="text-burgundy">Login</Link>
        </p>
      </div>
    </div>
  );
}
