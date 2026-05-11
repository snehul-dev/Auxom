import API from "./api"
const registerUser = async (userData) => {
  const res = await API.get(`/users?email=${userData.email}`)

  if (res.data.length > 0) {
    throw new Error("User already exists")
  }

  return API.post("/users", userData)
}
const loginUser = async({email,password})=>{
    let res = await API.get(`/users?email=${email}`)
    const users = res.data
    if (users.length > 0 && users[0].password === password) {
        return [users[0]]
    }
    return []
}

export { registerUser, loginUser};