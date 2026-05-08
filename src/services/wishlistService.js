import API from "./api";

const getWishlist = async (userId) => {
  const res = await API.get(`/wishlists?userId=${userId}`);
  return res.data;
};

const addToWishlistAPI = async (wishlistItem) => {
  const res = await API.post("/wishlists", wishlistItem);
  return res.data;
};

const removeFromWishlist = async (id) => {
  const res = await API.delete(`/wishlists/${id}`);
  return res.data;
};

const clearWishlist = async (userId) => {
  const res = await API.get(`/wishlists?userId=${userId}`);
  const items = res.data;
  await Promise.all(items.map(item => API.delete(`/wishlists/${item.id}`)));
};

export { getWishlist, addToWishlistAPI, removeFromWishlist, clearWishlist };