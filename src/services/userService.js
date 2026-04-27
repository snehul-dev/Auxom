import axios from "axios";

const API = axios.create({
    baseURL:"http://localhost:3001/"
})

const registerUser = async (userData) => {
  const res = await API.get(`/users?email=${userData.email}`)

  if (res.data.length > 0) {
    throw new Error("User already exists")
  }

  return API.post("/users", userData)
}
const loginUser = async({email,password})=>{
    let res = await API.get(`/users?email=${email}&password=${password}`)
    return res.data
}

export { registerUser, loginUser};