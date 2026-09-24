import User from "../models/User.js";
import { generateToken, setAuthCookie, clearAuthCookie } from "../utils/generateToken.js";

export async function register(req, res, next) {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ message: "An account with this email already exists." });

    const user = await User.create({ name, email, phone, password });
    const token = generateToken(user._id);
    setAuthCookie(res, token);
    res.status(201).json({ user: user.toPublicJSON() });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    const token = generateToken(user._id);
    setAuthCookie(res, token);
    res.json({ user: user.toPublicJSON() });
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res) {
  clearAuthCookie(res);
  res.json({ message: "Logged out." });
}

export async function getMe(req, res) {
  res.json({ user: req.user.toPublicJSON() });
}
