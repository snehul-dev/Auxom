import React, { useState } from "react";
import authBackground from "../assets/authBackground.jpeg";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/userService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../services/cartService";
import { getWishlist } from "../services/wishlistService";
import { getOrders } from "../services/orderService";

import { login } from "../redux/slices/authSlice";
import { setCart } from "../redux/slices/cartSlice";
import { setOrders } from "../redux/slices/orderSlice";
import { setWishlist } from "../redux/slices/whishlistSlice";


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth.user)
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const mutation = useMutation({
    mutationFn: loginUser,

    onSuccess: async (data) => {
      if (data.length > 0) {
        const user = data[0];

        dispatch(login(user));
        const cartData = await getCart(user.id)
        const wishlistData = await getWishlist(user.id)
        const orderData = await getOrders(user.id)

        dispatch(setCart(cartData))
        dispatch(setWishlist(wishlistData))
        dispatch(setOrders(orderData))

        toast.success("Login successfully");
        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error("Invalid credentials");
      }
    },

    onError: () => {
      toast.error("Login Failed");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    const validateErrors = validate();
    if (Object.keys(validateErrors).length > 0) {
      setError(validateErrors);
      return;
    }

    mutation.mutate({
      email: input.email,
      password: input.password,
    });
  }

  const validate = () => {
    const err = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!input.email) {
      err.email = "Email required";
    } else if (!emailRegex.test(input.email)) {
      err.email = "Invalid email format";
    }

    if (!input.password) {
      err.password = "Password required";
    }

    return err;
  };

  function handleInput(e) {
    const { value, name } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${authBackground})`,
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="relative z-10 w-87.5 text-center text-white"
      >
        <h1 className="text-2xl tracking-widest mb-6">Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email@example.com"
          value={input.email}
          onChange={handleInput}
          className="w-full mb-2 px-4 py-3 rounded-full bg-white/20 placeholder-white border border-white/30 backdrop-blur-md focus:outline-none"
        />
        <p className="text-red-300 text-sm mb-2">{error.email}</p>

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={input.password}
          onChange={handleInput}
          className="w-full mb-2 px-4 py-3 rounded-full bg-white/20 placeholder-white border border-white/30 backdrop-blur-md focus:outline-none"
        />
        <p className="text-red-300 text-sm mb-3">{error.password}</p>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={mutation.isPending}
          className={`w-full py-3 rounded-full transition ${mutation.isPending
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#4fd1c5] hover:opacity-90"
            }`}
        >
          {mutation.isPending ? "Logging in..." : "Login"}
        </button>

        {/* REGISTER */}
        <p className="text-sm mt-4 text-gray-300">
          Don’t have an account?{" "}
          <span
            className="text-white cursor-pointer underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;