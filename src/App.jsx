import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./components/Products";
import ProductDisplay from "./components/ProductDisplay";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute"
import Wishlist from "./components/whishlist"
import Cart from "./pages/Cart";
import { Toaster } from "react-hot-toast";
import Payment from "./components/Payment";
import OrderSuccess from "./components/Ordersuccess";
import Orders from "./pages/Orders";
import Notfound from "./components/Notfound";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getWishlist } from "./services/wishlistService";
import { getCart } from "./services/cartService";
import { useEffect } from "react";
import { setWishlist } from "./redux/slices/whishlistSlice";
import { addToCart, setCart } from "./redux/slices/cartSlice";
import { getOrders } from "./services/orderService";
import {  setOrders } from "./redux/slices/orderSlice";

function App() {
  const user = useSelector((s) => s?.auth.user)

  const { data: wishlistData } = useQuery({
    queryKey: ["whishlist", user?.id],
    queryFn: () => getWishlist(user?.id)
  })

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setWishlist(wishlistData || []))
  }, [wishlistData])

  const { data: cartData } = useQuery({
    queryKey: ["addtocart", user?.id],
    queryFn: () => getCart(user?.id)
  })
  useEffect(() => {
    dispatch(setCart(cartData || []))
  }, [cartData])


  const {data:orderData} = useQuery({
    queryKey:["orders",user?.id],
    queryFn:()=>getOrders(user?.id)
  })
  useEffect(()=>{
    dispatch(setOrders(orderData||[]))
  },[orderData])
  return (
    <>
      <Toaster />

      <Routes>
        <Route
          path="/"
          element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDisplay />} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="*" element={<Notfound />} />

      </Routes>
    </>
  );
}

export default App;