import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/",
});


// ✅ REGISTER USER (with default cart + wishlist)
const registerUser = async (userData) => {
  const res = await API.get(`/users?email=${userData.email}`);

  if (res.data.length > 0) {
    throw new Error("User already exists");
  }

  const newUser = {
    ...userData,
    wishlist: [],
    cart: [], // 🔥 important
  };

  const response = await API.post("/users", newUser);
  return response.data;
};


// ✅ LOGIN USER
const loginUser = async ({ email, password }) => {
  const res = await API.get(
    `/users?email=${email}&password=${password}`
  );

  return res.data;
};


// ✅ UPDATE USER CART (MAIN FUNCTION YOU NEED)
const updateUserCart = async (userId, updatedCart) => {
  const res = await API.patch(`/users/${userId}`, {
    cart: updatedCart,
  });

  return res.data;
};


// ✅ OPTIONAL: GET USER BY ID (useful later)
const getUserById = async (id) => {
  const res = await API.get(`/users/${id}`);
  return res.data;
};


export {
  registerUser,
  loginUser,
  updateUserCart,
  getUserById,
};