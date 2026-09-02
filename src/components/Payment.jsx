import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../redux/slices/orderSlice";
import { clearCart } from "../redux/slices/cartSlice";
import Footer from "./Footer";
import Backbutton from "./Backbutton";
import toast from "react-hot-toast";

import { addOrderAPI, pendingOrder } from "../services/orderService";
import { createRazorpayOrder, verifyPayment } from "../services/paymentService";


import {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} from "../services/addressService";

function Payment() {
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state?.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [method, setMethod] = useState("cod");

  const [isLoading, setIsLoading] = useState(false);

  // Saved addresses
  const [addresses, setAddresses] = useState([]);

  // Selected address
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  // Add/Edit mode
  const [editingAddressId, setEditingAddressId] = useState(null);

  // Address form
  const [form, setForm] = useState({
    name: "",
    phone: "",
    streetAddress: "",
    city: "",
    pincode: "",
  });

  const [error, setError] = useState({});

  // GET SAVED ADDRESSES
  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      const data = await getAddresses();

      console.log("ADDRESSES FROM API:", data);

      setAddresses(data || []);

      // If addresses exist, select first one
      if (data && data.length > 0) {
        const firstAddress = data[0];

        setSelectedAddressId(firstAddress.addressId);

        setForm({
          name: firstAddress.name || "",
          phone: firstAddress.phone || "",
          streetAddress: firstAddress.streetAddress || "",
          city: firstAddress.city || "",
          pincode: firstAddress.pincode || "",
        });
      }
    } catch (error) {
      console.log("GET ADDRESS ERROR:", error);
      console.log("ERROR RESPONSE:", error.response?.data);
      setAddresses([]);
    }
  };

  // FORM CHANGE
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // User is editing address manually
    setSelectedAddressId(null);

    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  // VALIDATION
  function validate() {
    const err = {};

    if (!form.name?.trim()) {
      err.name = "Name required";
    }

    if (!form.phone?.trim()) {
      err.phone = "Phone required";
    }

    if (!form.streetAddress?.trim()) {
      err.streetAddress = "Address required";
    }

    if (!form.city?.trim()) {
      err.city = "City required";
    }

    if (!form.pincode?.trim()) {
      err.pincode = "Pincode required";
    }

    return err;
  }

  const isFormValid =
    form.name &&
    form.phone &&
    form.streetAddress &&
    form.city &&
    form.pincode;

  // SELECT ADDRESS
  const handleSelectAddress = (address) => {
    setSelectedAddressId(address.addressId);

    setEditingAddressId(null);

    setForm({
      name: address.name || "",
      phone: address.phone || "",
      streetAddress: address.streetAddress || "",
      city: address.city || "",
      pincode: address.pincode || "",
    });

    setError({});
  };

  // ADD ADDRESS
  const handleAddAddress = async () => {
    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    try {
      const ad = await addAddress(form);
      console.log("added address", ad)

      await loadAddresses();

      setEditingAddressId(null);

      toast("Address added successfully.");
    } catch (error) {
      console.error("Failed to add address:", error);
    }
  };

  // START EDIT
  const handleEditAddress = (address) => {
    console.log("ADDRESS OBJECT:", address);

    setEditingAddressId(address.addressId);

    setSelectedAddressId(address.addressId);

    setForm({
      name: address.name || "",
      phone: address.phone || "",
      streetAddress: address.streetAddress || "",
      city: address.city || "",
      pincode: address.pincode || "",
    });

    setError({});
  };

  // UPDATE ADDRESS
  const handleUpdateAddress = async () => {

    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    setError({});

    try {
      const updatedAddress = await updateAddress(editingAddressId, form);

      setAddresses(prev =>
        prev.map(address =>
          address.addressId === editingAddressId
            ? updatedAddress
            : address
        )
      );

      setEditingAddressId(null);

      toast("Address updated successfully.");
    } catch (error) {
      console.error("Failed to update address:", error);
    }
  };

  // DELETE ADDRESS
  const handleDeleteAddress = async (addressId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteAddress(addressId);

      const remainingAddresses = addresses.filter(
        (address) => address.addressId !== addressId
      );

      setAddresses(remainingAddresses);

      // If deleted address was selected
      if (selectedAddressId === addressId) {
        setSelectedAddressId(null);

        if (remainingAddresses.length > 0) {
          handleSelectAddress(remainingAddresses[0]);
        } else {
          setForm({
            name: "",
            phone: "",
            streetAddress: "",
            city: "",
            pincode: "",
          });
        }
      }

      toast("Address deleted successfully.");
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  };

  // NEW ADDRESS
  const handleNewAddress = () => {
    setEditingAddressId(null);
    setSelectedAddressId(null);

    setForm({
      name: "",
      phone: "",
      streetAddress: "",
      city: "",
      pincode: "",
    });

    setError({});
  };

  // TOTAL
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // PAYMENT
  async function handlePayment() {
    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    if (!user) {
      navigate("/login");
      return;
    }

    // COD
    if (method === "cod") {
      try {
        const newOrder = {
          AddressId: selectedAddressId,
          PaymentMethod: "CashOnDelivery"
        };

        const ordersdb = await addOrderAPI(newOrder);

        dispatch(addOrder(ordersdb));

        dispatch(clearCart());

        navigate("/success");
      } catch (error) {
        console.error("Failed to place order:", error);
      }

      return;
    }

    try {
      setIsLoading(true)
      const newOrder = {
        AddressId: selectedAddressId,
        PaymentMethod: "online"
      }
      const pending = await pendingOrder(newOrder);
      console.log("PENDING RESPONSE:", pending);
      const orderId = pending.orderId

      const razorpayOrder = await createRazorpayOrder(orderId);

      // ONLINE PAYMENT
      const options = {
        key: razorpayOrder.keyId,


        amount: razorpayOrder.amount * 100,

        currency: razorpayOrder.currency,
        name: "AUXOM",

        description: "Test Payment",
        order_id: razorpayOrder.orderId,

        handler: async function (response) {
          try {
            const result = await verifyPayment({
              orderId: orderId,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,


            })




            dispatch(clearCart());

            navigate("/success");
          } catch (error) {
            console.error(
              "Failed to place online order:",
              error
            );
            toast.error("Payment Verification failed");
          }
        },

        prefill: {
          name: form.name,
          contact: form.phone,
        },

        theme: {
          color: "#000000",
        },
      };

      const razorpay = new window.Razorpay(options);
        setIsLoading(false);
      razorpay.open();
    } catch (error) {
      console.log("Failed to create pending order", error);
      setIsLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <Backbutton />

      <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-6">

          {/* SHIPPING DETAILS */}
          <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex justify-between items-center mb-4">

              <h2 className="text-xl font-semibold">
                Shipping Details
              </h2>

              <button
                onClick={handleNewAddress}
                className="text-sm bg-black text-white px-4 py-2 rounded-lg"
              >
                + New Address
              </button>

            </div>

            {/* SAVED ADDRESSES */}
            {addresses.length > 0 && (
              <div className="mb-6">

                <h3 className="font-medium mb-3">
                  Saved Addresses
                </h3>

                <div className="space-y-3">

                  {addresses.map((address) => (

                    <div
                      key={address.addressId}
                      className={`border rounded-xl p-4 cursor-pointer ${selectedAddressId === address.addressId
                        ? "border-black bg-gray-50"
                        : "border-gray-200"
                        }`}
                      onClick={() =>
                        handleSelectAddress(address)
                      }
                    >

                      <div className="flex justify-between">

                        <div>

                          <p className="font-semibold">
                            {address.name}
                          </p>

                          <p className="text-sm text-gray-600">
                            {address.phone}
                          </p>

                          <p className="text-sm text-gray-600 mt-1">
                            {address.streetAddress}
                          </p>

                          <p className="text-sm text-gray-600">
                            {address.city} - {address.pincode}
                          </p>

                        </div>

                        <div className="flex gap-2">

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditAddress(address);
                            }}
                            className="text-blue-500 text-sm"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAddress(
                                address.addressId
                              );
                            }}
                            className="text-red-500 text-sm"
                          >
                            Delete
                          </button>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              </div>
            )}

            <h3 className="font-medium mb-3">
              {editingAddressId
                ? "Edit Address"
                : "Address Details"}
            </h3>

            <div className="space-y-3">

              {[
                "name",
                "phone",
                "streetAddress",
                "city",
                "pincode",
              ].map((field) => (

                <div key={field}>

                  <input
                    type="text"
                    name={field}
                    placeholder={
                      field === "streetAddress"
                        ? "Address"
                        : field
                    }
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

            <div className="flex gap-3 mt-4">

              {editingAddressId ? (

                <button
                  onClick={handleUpdateAddress}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                >
                  Update Address
                </button>

              ) : (

                <button
                  onClick={handleAddAddress}
                  className="bg-black text-white px-5 py-2 rounded-lg"
                >
                  Save Address
                </button>

              )}

            </div>

          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto">

              {cartItems.map((item) => (

                <div
                  key={item.productId}
                  className="flex justify-between text-sm"
                >

                  <span>
                    {item.productName} × {item.quantity}
                  </span>

                  <span>
                    ₹{item.price * item.quantity}
                  </span>

                </div>

              ))}

            </div>

            <div className="border-t mt-4 pt-4 flex justify-between font-semibold">

              <span>Total</span>

              <span>
                ₹{total}
              </span>

            </div>

            {/* PAYMENT METHOD */}
            <div className="mt-6">

              <h3 className="mb-2 font-medium">
                Payment Method
              </h3>

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
              disabled={!isFormValid || isLoading}
              className={`mt-6 w-full py-3 rounded-xl text-white flex items-center justify-center gap-2 ${isFormValid && !isLoading
                  ? "bg-black hover:bg-gray-900"
                  : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </button>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Payment;