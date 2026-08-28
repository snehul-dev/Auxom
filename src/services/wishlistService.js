import API from "./api";

const getWishlist = async () => {
  const res = await API.get("/Wishlist");
  return res.data;
};

const addToWishlistAPI = async (productId) => {
  const res = await API.post("/Wishlist", {
    ProductId : productId
  });
  return res.data;
};

const removeFromWishlist = async (productId) => {
  const res = await API.delete(`/Wishlist/${productId}`);
  return res.data;
};

const clearWishlist = async () => {
  const res = await API.delete("/Wishlist");
  return res.data;
  
};

export { getWishlist, addToWishlistAPI, removeFromWishlist, clearWishlist };