import API from "./api"
const registerUser = async (userData) => {
const response = await API.post("/Auth/register", userData);
  return response.data;
}
const loginUser = async ({ email, password }) => {
  const response = await API.post("/Auth/login", {
    email,
    password
  });

  return response.data;
};

export { registerUser, loginUser};