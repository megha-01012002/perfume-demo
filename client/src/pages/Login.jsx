import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(email, password);
      navigate(user.role === "admin" ? "/admin" : location.state?.from?.pathname || "/account");
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-lux py-16 sm:py-24 flex justify-center">
      <div className="w-full max-w-sm">
        <p className="eyebrow text-center mb-3">Welcome Back</p>
        <h1 className="font-display text-3xl text-burgundy-dark text-center mb-8">Login</h1>

        <form onSubmit={submit} className="space-y-4">
          <input className="input-lux" type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="input-lux" type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-charcoal/60">
              <input type="checkbox" checked={remember} onChange={() => setRemember((r) => !r)} className="accent-burgundy" />
              Remember me
            </label>
            <Link to="/contact" className="text-burgundy">Forgot password?</Link>
          </div>
          {error && <p className="text-sm text-burgundy">{error}</p>}
          <button disabled={loading} className="btn-primary w-full">{loading ? "Signing in…" : "Login"}</button>
        </form>

        <div className="mt-6 text-xs text-charcoal/50 bg-beige/30 p-4 leading-relaxed">
          <p className="font-medium text-charcoal mb-1">Demo credentials</p>
          <p>Customer — demo@eloria.com / Demo@123</p>
          <p>Admin — admin@eloria.com / Admin@123</p>
        </div>

        <p className="text-center text-sm text-charcoal/60 mt-6">
          Don't have an account? <Link to="/register" className="text-burgundy">Register</Link>
        </p>
      </div>
    </div>
  );
}
