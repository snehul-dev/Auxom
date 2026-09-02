import API from "./api";

const addAddress  = async(address) =>{
    const res = await API.post("/Address",address);
    return res.data;
}

const getAddresses  = async() =>{
    const res = await API.get("/Address");
    return res.data;
}
const updateAddress  = async(addressId , address)=>{
    const res = await API.patch(`/Address/${addressId}`,address);
    return res.data;
}
const deleteAddress  = async(addressId) =>{
    const res = await API.delete(`/Address/${addressId}`);
    return res.data;   
}
export {addAddress , getAddresses , updateAddress,deleteAddress}