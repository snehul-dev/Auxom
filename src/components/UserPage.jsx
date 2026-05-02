import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { logout } from "../redux/slices/authSlice";

function UserPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const wishlist = useSelector((state) => state.wishlist?.items || []);

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* HEADER */}
          <div className="bg-black text-white p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center text-xl font-bold">
              {user?.fullName?.charAt(0).toUpperCase() || "U"}
            </div>

            <div>
              <h2 className="text-lg font-semibold">{user.fullName}</h2>
              <p className="text-sm text-gray-300">{user.email}</p>
            </div>
          </div>

          {/* BODY */}
          <div className="p-6 space-y-4">

            {/* Wishlist */}
            <div
              onClick={() => navigate("/wishlist")}
              className="flex justify-between items-center border p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition"
            >
              <span className="font-medium">Wishlist</span>
              <span className="text-gray-500 text-sm">
                {wishlist.length} items →
              </span>
            </div>

            {/* Cart */}
            <div
              onClick={() => navigate("/cart")}
              className="flex justify-between items-center border p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition"
            >
              <span className="font-medium">My Cart</span>
              <span className="text-gray-500 text-sm">View →</span>
            </div>

          </div>

          {/* FOOTER */}
          <div className="border-t p-6 flex justify-end">
            <button
              onClick={handleLogout}
              className="px-6 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition"
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default UserPage;