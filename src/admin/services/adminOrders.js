import API from "../../services/api";

const getAdminOrders = async () => {
  const res = await API.get("/orders");

  return res.data;
};

const updateOrder = async (id,updatedOrder) => {
  const res = await API.put(
    `/orders/${id}`,
    updatedOrder
  );

  return res.data;
};


const deleteOrder = async (id) => {
  const res = await API.delete(
    `/orders/${id}`
  );

  return res.data;
};

export {
  getAdminOrders,
  updateOrder,
  deleteOrder,
};