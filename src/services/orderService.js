import API from "./api";

const getOrders = async () => {
  const res = await API.get("/Order");
  return res.data;
};

const addOrderAPI = async (order) => {
  const res = await API.post("/Order", order);
  return res.data;
};

const pendingOrder = async(order) =>{
  const res = await API.post("/Order/pending",order)
  return res.data;
}


export { getOrders, addOrderAPI ,pendingOrder };