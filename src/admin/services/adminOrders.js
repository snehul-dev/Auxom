import API from "../../services/api";

const getAdminOrders = async () => {
  const res = await API.get("/admin/orders");

  return res.data;
};

const updateOrder = async (orderId,status) => {
  const res = await API.patch( `/admin/orders/${orderId}/status`,{
    status,
  });
  return res.data;
};



export {
  getAdminOrders,
  updateOrder,
};