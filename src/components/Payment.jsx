import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../redux/slices/orderSlice";
import { clearCart } from "../redux/slices/cartSlice";
import Footer from "./Footer";
import Backbutton from "./Backbutton";
import { addOrderAPI } from "../services/orderService";
import { clearCart as clearCartAPI } from "../services/cartService";

function Payment() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s)=>s?.auth.user)
  const [method, setMethod] = useState("cod");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [error, setError] = useState({});

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validate() {
    const err = {};

    if (!form.name) err.name = "Name required";
    if (!form.phone) err.phone = "Phone required";
    if (!form.address) err.address = "Address required";
    if (!form.city) err.city = "City required";
    if (!form.pincode) err.pincode = "Pincode required";

    return err;
  }

  const isFormValid =
    form.name &&
    form.phone &&
    form.address &&
    form.city &&
    form.pincode;

  async function handlePayment() {
    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }
    const newOrder = {
      userId:user.id,
      items: cartItems,
      total,
      method,
      date: new Date().toLocaleString(),
      address: form,
    };
 


    const ordersdb = await addOrderAPI(newOrder)

    dispatch(addOrder(ordersdb));
    await clearCartAPI(user.id)
    dispatch(clearCart());
    navigate("/success");
  }

  return (
    <>
      <Navbar />
      <Backbutton/>
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-6">

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Shipping Details
            </h2>

            <div className="space-y-3">
              {["name","phone","address","city","pincode"].map((field) => (
                <div key={field}>
                  <input
                    type="text"
                    name={field}
                    placeholder={field}
                    value={form[field]}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                  />
                  <p className="text-red-500 text-sm">
                    {error[field]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <span>{item.name} × {item.qty}</span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <div className="mt-6">
              <h3 className="mb-2 font-medium">Payment Method</h3>

              <label className="flex gap-2">
                <input
                  type="radio"
                  checked={method === "cod"}
                  onChange={() => setMethod("cod")}
                />
                Cash on Delivery
              </label>

              <label className="flex gap-2">
                <input
                  type="radio"
                  checked={method === "online"}
                  onChange={() => setMethod("online")}
                />
                Online Payment
              </label>
            </div>

            <button
              onClick={handlePayment}
              disabled={!isFormValid}
              className={`mt-6 w-full py-3 rounded-xl text-white ${
                isFormValid
                  ? "bg-black hover:bg-gray-900"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Payment;