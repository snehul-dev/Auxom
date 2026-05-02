import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./components/Products";
import ProductDisplay from "./components/ProductDisplay";
import ProtectedRoute from "./components/ProtectedRoute";
import Wishlist from "./components/whishlist"
import Cart from "./pages/Cart";
import { Toaster } from "react-hot-toast";
import Payment from "./components/Payment";
import OrderSuccess from "./components/Ordersuccess";
import Orders from "./pages/Orders";
import Notfound from "./components/Notfound";

function App() {
  return (
    <>
      <Toaster />

      <Routes>
        <Route
          path="/"
          element={ <Home /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDisplay />} />
        <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
        <Route path="/wishlist" element={<ProtectedRoute><Wishlist/></ProtectedRoute>}/>
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/orders" element={<ProtectedRoute><Orders/></ProtectedRoute>}/>
        <Route path="/success" element={<OrderSuccess/>}/>
       <Route path="*" element={<Notfound/>} />
        
      </Routes>
    </>
  );
}

export default App;