import API from "./api";

const getCart = async () => {
  const res = await API.get("/Cart");
  return res.data;
};

const addToCartAPI = async (cartItem) => {
  const res = await API.post("/Cart", cartItem);
  return res.data;
};

const updateCartItem = async (id, quantity) => {
  const res = await API.patch(`/Cart/items/${id}`, {
    Quantity  : quantity
  });
  return res.data;
};

const removeFromCart = async (id) => {
  const res = await API.delete(`/Cart/items/${id}`);
  return res.data;
};

const clearCart = async () => {
  const res = await API.delete("/Cart");
  return res.data;
};

export { getCart, addToCartAPI, updateCartItem, removeFromCart, clearCart };