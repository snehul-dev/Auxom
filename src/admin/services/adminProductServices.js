import API from "../../services/api";


const getProducts = async () => {
  const res = await API.get("/products");

  return res.data;
};


const addProduct = async (product) => {
  const res = await API.post( "/products", product );

  return res.data;
};

const updateProduct = async (id,product) => {
  const res = await API.put(`/products/${id}`,product);
  return res.data;
};


const deleteProduct = async (id) => {
  const res = await API.delete(`/products/${id}` );

  return res.data;
};

export {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};