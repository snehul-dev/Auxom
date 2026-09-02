import API from "../../services/api";

const getAdminDashboard = async()=>{
    const res = await API.get("/AdminDashBoard");
    return res.data;
}
export {getAdminDashboard}