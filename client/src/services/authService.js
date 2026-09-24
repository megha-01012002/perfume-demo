import api from "./api";

const DEMO_USERS_KEY = "eloria_demo_users";
const SESSION_KEY = "eloria_demo_session";
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== "false";

function readUsers() {
  const raw = localStorage.getItem(DEMO_USERS_KEY);
  if (raw) return JSON.parse(raw);
  const seeded = [
    {
      id: "admin-1",
      name: "Éloria Admin",
      email: "admin@eloria.com",
      phone: "9999999999",
      password: "Admin@123",
      role: "admin",
    },
    {
      id: "customer-1",
      name: "Demo Customer",
      email: "demo@eloria.com",
      phone: "9876543210",
      password: "Demo@123",
      role: "customer",
    },
  ];
  localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(seeded));
  return seeded;
}

function writeUsers(users) {
  localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(users));
}

function publicUser(u) {
  if (!u) return null;
  const { password, ...rest } = u;
  return rest;
}

export const authService = {
  async getCurrentUser() {
    if (!USE_MOCK) {
      try {
        const { data } = await api.get("/auth/me");
        return data.user;
      } catch {
        return null;
      }
    }
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const users = readUsers();
    const found = users.find((u) => u.id === raw);
    return publicUser(found);
  },

  async login(email, password) {
    if (!USE_MOCK) {
      const { data } = await api.post("/auth/login", { email, password });
      return data.user;
    }
    const users = readUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error("Invalid email or password.");
    localStorage.setItem(SESSION_KEY, found.id);
    return publicUser(found);
  },

  async register({ name, email, phone, password }) {
    if (!USE_MOCK) {
      const { data } = await api.post("/auth/register", { name, email, phone, password });
      return data.user;
    }
    const users = readUsers();
    if (users.some((u) => u.email === email)) {
      throw new Error("An account with this email already exists.");
    }
    const newUser = { id: `user-${Date.now()}`, name, email, phone, password, role: "customer" };
    users.push(newUser);
    writeUsers(users);
    localStorage.setItem(SESSION_KEY, newUser.id);
    return publicUser(newUser);
  },

  async logout() {
    if (!USE_MOCK) {
      await api.post("/auth/logout");
      return;
    }
    localStorage.removeItem(SESSION_KEY);
  },
};
