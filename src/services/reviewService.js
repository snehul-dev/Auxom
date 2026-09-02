import API from "./api";

const addReviewAPI = async(productId , rating) =>{
   const res =  await API.post(`/review/${productId}`,{
        rating
    })
    return res.data;
}

const getUserReviewsAPI = async() =>{
    const res = await API.get("/review/user");
    return res.data;
}
export {addReviewAPI ,getUserReviewsAPI } ;