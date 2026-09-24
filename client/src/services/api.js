import axios from "axios";

// Points at the Express backend (server/server.js). withCredentials is
// required because auth uses HTTP-only cookies (see
// server/controllers/authController.js).
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true,
});

export default api;
