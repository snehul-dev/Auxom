import API from "../../services/api";

// GET PRODUCTS
const getProducts = async () => {
  const res = await API.get("/products");

  return res.data;
};

// ADD PRODUCT
const addProduct = async (product) => {
  const res = await API.post(
    "/products",
    product
  );

  return res.data;
};

// UPDATE PRODUCT
const updateProduct = async (
  id,
  product
) => {
  const res = await API.put(
    `/products/${id}`,
    product
  );

  return res.data;
};

// DELETE PRODUCT
const deleteProduct = async (id) => {
  const res = await API.delete(
    `/products/${id}`
  );

  return res.data;
};

export {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};