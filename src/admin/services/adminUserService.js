import API from "../../services/api";

const getUsers = async () => {
  const res = await API.get("/users");

  return res.data;
};

const updateUser = async (id, updatedUser) => {
  const res = await API.put(`/users/${id}`, updatedUser);

  return res.data;
};

const deleteUser = async (id) => {
  const res = await API.delete(
    `/users/${id}`
  );

  return res.data;
};

export {
  getUsers,
  updateUser,
  deleteUser,
};