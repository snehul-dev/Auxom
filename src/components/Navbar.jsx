import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function handleLogout() {
    dispatch(logout()); // ✅ Redux handles localStorage internally
    navigate("/");
  }

  return (
    <div className="bg-black text-white px-6 md:px-10 py-5 sticky top-0 z-50">

      <div className="flex justify-between items-center">

        <h1
          className="text-xl font-bold tracking-widest cursor-pointer"
          onClick={() => navigate("/")}
        >
          AUXOM
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-sm">
          <p
            onClick={() => navigate("/")}
            className="cursor-pointer hover:text-gray-400"
          >
            Home
          </p>

          <p
            onClick={() => {
              document.getElementById("category")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="cursor-pointer hover:text-gray-400"
          >
            MEN
          </p>

          <p
            onClick={() => navigate("/products")}
            className="cursor-pointer hover:text-gray-400"
          >
            COLLECTION
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            🛒

            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>

          {user ? (
            <div className="flex items-center gap-3">

              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-sm font-semibold">
                {user?.fullName?.charAt(0).toUpperCase() || "U"}
              </div>

              {/* Name */}
              <span className="hidden md:block text-sm">
                Hi, {user.fullName}
              </span>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-sm border px-3 py-1 rounded hover:bg-white hover:text-black transition hidden md:flex"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="border px-4 py-1 rounded hover:bg-white hover:text-black transition hidden md:flex"
            >
              Login
            </button>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="flex flex-col gap-4 mt-6 md:hidden text-sm">

          <p
            onClick={() => navigate("/products")}
            className="cursor-pointer hover:text-gray-400"
          >
            MEN
          </p>

          <p
            onClick={() => navigate("/products")}
            className="cursor-pointer hover:text-gray-400"
          >
            COLLECTION
          </p>

          <p
            onClick={() => {
              document.getElementById("Allproducts")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="cursor-pointer hover:text-gray-400"
          >
            TRENDS
          </p>

          {user ? (
            <div className="text-end">
              <button
                onClick={handleLogout}
                className="text-sm px-3 py-1 border border-white hover:bg-white hover:text-black transition"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <div className="flex justify-end">
              <button
                onClick={() => navigate("/login")}
                className="border border-white px-4 py-2 w-fit hover:bg-white hover:text-black transition"
              >
                LOGIN
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;