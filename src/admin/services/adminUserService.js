import API from "../../services/api";

const getUsers = async () => {
  const res = await API.get("/admin/users");

  return res.data;
};

const updateUser = async (userId,IsBlocked) => {
  const res = await API.patch(`/admin/users/${userId}/status`, {
    IsBlocked,
  });

  return res.data;
};

export {
  getUsers,
  updateUser,
  
};