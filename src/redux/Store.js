import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import whishlistReducer from "./slices/whishlistSlice"
import orderReducer from "./slices/orderSlice"
import productReducer from "./slices/productSlice"
import userReducer from "./slices/userSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: whishlistReducer,
    orders:orderReducer,
    products: productReducer,
    users: userReducer
  },
});

export default store;