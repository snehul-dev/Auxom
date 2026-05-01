import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./components/Products";
import ProductDisplay from "./components/ProductDisplay";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDisplay />} />
        <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
      </Routes>
    </>
  );
}

export default App; 