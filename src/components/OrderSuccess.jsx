import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">

          {/* SUCCESS ICON */}
          <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100">
            <span className="text-3xl">✅</span>
          </div>

          {/* TITLE */}
          <h1 className="text-2xl font-semibold mb-2">
            Order Placed Successfully
          </h1>

          {/* MESSAGE */}
          <p className="text-gray-600 text-sm mb-6">
            Thank you for shopping with AUXOM.  
            Your order has been placed and will be delivered soon.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col gap-3">

            <button
              onClick={() => navigate("/")}
              className="bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition"
            >
              Continue Shopping
            </button>

            <button
              onClick={() => navigate("/orders")}
              className="border border-black py-3 rounded-lg hover:bg-black hover:text-white transition"
            >
              View Orders
            </button>

          </div>
        </div>
      </div>
    </>
  );
}

export default OrderSuccess;