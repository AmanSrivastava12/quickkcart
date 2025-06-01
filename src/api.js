import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getProduct = () => api.get("/products");
export const createOrder = (orderData) => api.post("/orders", orderData);
export const getOrder = (orderNumber) => api.get(`/orders/${orderNumber}`);
