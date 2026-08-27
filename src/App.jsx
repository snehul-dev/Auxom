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
import { setOrders } from "./redux/slices/orderSlice";
import { getProducts } from "./services/productService";
import { setProducts } from "./redux/slices/productSlice";
import { getUsers } from "./admin/services/adminUserService";
import { setUsers } from "./redux/slices/userSlice";
import Dashboard from "./admin/pages/Dashboard";
import ProductsAdmin from "./admin/pages/Products"
import Users from './admin/pages/Users'
import OrdersAdmin from './admin/pages/Orders'
import AdminProfile from "./admin/pages/Adminprofile";
import AdminProtectedRoute from "./admin/components/AdminProtectedRoute";


function App() {
  const user = useSelector((s) => s?.auth.user)
  console.log("APP USER:", user);
  console.log("APP CURRENT PATH:", window.location.pathname);

  const { data: wishlistData } = useQuery({
    queryKey: ["whishlist", user?.userId],
    queryFn: () => getWishlist(user?.userId),
    enabled: !!user?.userId
  })

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setWishlist(wishlistData || []))
  }, [wishlistData])

  const { data: cartData } = useQuery({
    queryKey: ["addtocart", user?.userId],
    queryFn: () => getCart(user?.userId),
    enabled: !!user?.userId
  })
  useEffect(() => {
    dispatch(setCart(cartData || []))
  }, [cartData])


  const { data: orderData } = useQuery({
    queryKey: ["orders", user?.userId],
    queryFn: () => getOrders(user?.userId),
    enabled: !!user?.userId
  })
  useEffect(() => {
    dispatch(setOrders(orderData || []))
  }, [orderData])

  const { data: productData } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts()
  })
  useEffect(() => {
    dispatch(setProducts(productData || []))
  }, [productData])

  const { data: userData } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
      enabled: user?.role?.toLowerCase() === "admin"
  })
  useEffect(() => {
    dispatch(setUsers(userData || []))
  }, [userData])


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

        <Route path="/admin/dashboard" element={ <AdminProtectedRoute><Dashboard /></AdminProtectedRoute>  }/>
        <Route path="/admin/products"  element={<AdminProtectedRoute> <ProductsAdmin /> </AdminProtectedRoute> } />
        <Route path="/admin/users" element={ <AdminProtectedRoute> <Users /> </AdminProtectedRoute> } />
        <Route path="/admin/orders" element={ <AdminProtectedRoute><OrdersAdmin /></AdminProtectedRoute>  }/>
        <Route path="/admin/profile" element={ <AdminProtectedRoute> <AdminProfile /> </AdminProtectedRoute>  } />

      </Routes>
    </>
  );
}

export default App;