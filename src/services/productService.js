import API from "./api";

export const getProducts = async () => {
  const res = await API.get("/products");
  return res.data;
};

export const getSingleProduct = async (id) => {
  const res = await API.get(`/products/${id}`);
  return res.data;
};