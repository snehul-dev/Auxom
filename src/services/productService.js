import API from "./api";

export const getProducts = async (pageNumber = 1 ,pageSize = 9 ) => {
  const res = await API.get("/Product",{
    params:{
        pageNumber,
        pageSize
    }
  });
  return res.data;
};

export const getSingleProduct = async (id) => {
  const res = await API.get(`/Product/${id}`);
  return res.data;
};