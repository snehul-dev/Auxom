import axios from "axios";

const API =axios.create({
    baseURL : "http://localhost:3001/"
})

const getProducts = async ()=>{
  let res = await API.get("/products")
  return res.data
}
export {getProducts}