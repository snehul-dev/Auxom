import API from "./api";

const createRazorpayOrder = async(orderId) =>{
    const res = await API.post("/Payment/create-order",{
        orderId
    })
    return res.data;
}

const verifyPayment = async(paymentData) =>{
    const res = await API.post("/Payment/verify",paymentData);
    return res.data;
}

export {createRazorpayOrder,verifyPayment}