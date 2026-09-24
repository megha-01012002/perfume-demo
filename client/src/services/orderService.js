import api from "./api";

const ORDERS_KEY = "eloria_demo_orders";
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== "false";

function readOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  } catch {
    return [];
  }
}
function writeOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export const orderService = {
  // Mirrors POST /api/orders (see server/controllers/orderController.js)
  async createOrder({ userId, items, shippingAddress, contact, paymentMethod, totals }) {
    if (!USE_MOCK) {
      const { data } = await api.post("/orders", { items, shippingAddress, contact, paymentMethod, totals });
      return data.order;
    }
    const orders = readOrders();
    const order = {
      id: `ORD-${Date.now().toString().slice(-8)}`,
      userId: userId || "guest",
      items,
      shippingAddress,
      contact,
      paymentMethod,
      totals,
      paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
      orderStatus: "confirmed",
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 5 * 86400000).toISOString(),
    };
    orders.unshift(order);
    writeOrders(orders);
    return order;
  },

  async getOrder(id) {
    if (!USE_MOCK) {
      const { data } = await api.get(`/orders/${id}`);
      return data.order;
    }
    return readOrders().find((o) => o.id === id) || null;
  },

  async getOrdersForUser(userId) {
    if (!USE_MOCK) {
      const { data } = await api.get("/orders");
      return data.orders;
    }
    return readOrders().filter((o) => o.userId === userId);
  },
};
