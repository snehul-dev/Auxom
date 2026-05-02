import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/",
});

// ✅ Add order to user
export const addOrderToUser = async (userId, newOrder) => {
  const res = await API.get(`/users/${userId}`);
  const user = res.data;

  const updatedOrders = [...(user.orders || []), newOrder];

  await API.patch(`/users/${userId}`, {
    orders: updatedOrders,
  });

  return updatedOrders; // ✅ IMPORTANT
};

// ✅ Get orders of user
export const getUserOrders = async (userId) => {
  const res = await API.get(`/users/${userId}`);
  return res.data.orders || [];
};