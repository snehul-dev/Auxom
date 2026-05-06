import API from "./api";

const getCart = async (userId) => {
  const res = await API.get(`/carts?userId=${userId}`);
  return res.data;
};

const addToCart = async (cartItem) => {
  const res = await API.post("/carts", cartItem);
  return res.data;
};

const updateCartItem = async (id, cartItem) => {
  const res = await API.put(`/carts/${id}`, cartItem);
  return res.data;
};

const removeFromCart = async (id) => {
  const res = await API.delete(`/carts/${id}`);
  return res.data;
};

const clearCart = async (userId) => {
  const res = await API.get(`/carts?userId=${userId}`);
  const items = res.data;
  await Promise.all(items.map(item => API.delete(`/carts/${item.id}`)));
};

export { getCart, addToCart, updateCartItem, removeFromCart, clearCart };