import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { updateUserCart } from "../services/userService";
import { login } from "../redux/slices/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const items = user?.cart || [];

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  async function increaseQty(id) {
    const updatedCart = items.map((item) =>
      item.productId === id
        ? { ...item, qty: item.qty + 1 }
        : item
    );

    const updatedUser = await updateUserCart(user.id, updatedCart);
    dispatch(login(updatedUser));
  }

  async function decreaseQty(id) {
    const updatedCart = items.map((item) =>
      item.productId === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    );

    const updatedUser = await updateUserCart(user.id, updatedCart);
    dispatch(login(updatedUser));
  }

  async function removeItem(id) {
    const updatedCart = items.filter(
      (item) => item.productId !== id
    );

    const updatedUser = await updateUserCart(user.id, updatedCart);
    dispatch(login(updatedUser));
    toast.success("Item removed");
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 px-4 md:px-10 py-8">
        <h1 className="text-3xl font-semibold mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center mt-20 text-gray-500">
            <p className="text-lg">Your cart is empty</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">

            {/* LEFT - ITEMS */}
            <div className="md:col-span-2 flex flex-col gap-6">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between hover:shadow-lg transition"
                >
                  {/* PRODUCT */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-500 text-sm">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-4">

                    {/* QTY CONTROL */}
                    <div className="flex items-center border rounded-full overflow-hidden">
                      <button
                      type="button"
                        onClick={() => decreaseQty(item.productId)}
                        className="px-3 py-1 hover:bg-gray-200"
                      >
                        -
                      </button>

                      <span className="px-3">{item.qty}</span>

                      <button
                      type="button"
                        onClick={() => increaseQty(item.productId)}
                        className="px-3 py-1 hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>

                    {/* REMOVE */}
                    <button
                    type="button"
                      onClick={() => removeItem(item.productId)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT - SUMMARY */}
            <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-24">
              <h2 className="text-xl font-semibold mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between text-gray-600 mb-2">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>

              <div className="flex justify-between text-gray-600 mb-4">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className="border-t pt-4 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>

              <button
                type="button"
                onClick={() => navigate("/payment")}
                className="w-full mt-6 bg-black text-white py-3 rounded-full hover:bg-gray-900 transition shadow-md"
              >
                Checkout →
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;