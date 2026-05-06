import API from "./api";

const getOrders = async (userId) => {
  const res = await API.get(`/orders?userId=${userId}`);
  return res.data;
};

const addOrder = async (order) => {
  const res = await API.post("/orders", order);
  return res.data;
};

const clearOrders = async (userId) => {
  const res = await API.get(`/orders?userId=${userId}`);
  const items = res.data;
  await Promise.all(items.map(item => API.delete(`/orders/${item.id}`)));
};

export { getOrders, addOrder, clearOrders };