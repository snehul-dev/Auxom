import API from "../../services/api";


const getProducts = async () => {
  const res = await API.get("/Product");

  return res.data;
};


const addProduct = async (product) => {
  const res = await API.post( "/Product", product );

  return res.data;
};

const updateProduct = async (id,product) => {
  const res = await API.patch(`/Product/${id}`,product);
  return res.data;
};


const deleteProduct = async (id) => {
  const res = await API.delete(`/Product/${id}` );

  return res.data;
};

export {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};