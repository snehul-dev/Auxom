import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { increaseQty, decreaseQty, removeFromCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Backbutton from "../components/Backbutton";
import { removeFromCart as removeFromCartAPI, updateCartItem } from "../services/cartService";

function Cart() {
  const cartItems = useSelector((state) => state?.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = async (id) => {
    await removeFromCartAPI(id);

    dispatch(removeFromCart(id));
  };
  const handleIncrease = async (item) => {
    const updatedItem = {
      ...item,
      qty: item.qty + 1,
    };

    await updateCartItem(item.id, updatedItem);

    dispatch(increaseQty(item.id));
  };

  const handleDecrease = async (item) => {
    if (item.qty > 1) {
      const updatedItem = {
        ...item,
        qty: item.qty - 1,
      };

      await updateCartItem(item.id, updatedItem);

      dispatch(decreaseQty(item.id));
    } else {
      await removeFromCartAPI(item.id);

      dispatch(decreaseQty(item.id));
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <>
      <Navbar />
      <Backbutton />
      <div className="bg-gray-50 min-h-screen py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">
            Your Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow">
              <p className="text-gray-500 text-lg">Your cart is empty 🛒</p>
            </div>
          ) : (
            <>
              <div className="space-y-5">
                {cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-5 bg-white p-5 rounded-2xl shadow hover:shadow-md transition"
                  >
                    
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl"
                    />

                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h2>
                      <p className="text-gray-500 mt-1">
                        ₹{item.price}
                      </p>

                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() =>
                            handleDecrease(item)
                          }
                          className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-100"
                        >
                          -
                        </button>

                        <span className="font-medium">
                          {item.qty}
                        </span>

                        <button
                          onClick={() =>
                            handleIncrease(item)
                          }
                          className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:text-red-600 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-10 bg-white rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <p className="text-gray-500 text-sm">
                    Total Amount
                  </p>
                  <h2 className="text-2xl font-bold text-gray-900">
                    ₹{total}
                  </h2>
                </div>

                <button
                  onClick={() => navigate("/payment")}
                  className="relative group bg-linear-to-r from-black to-gray-800 text-white px-8 py-3 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <span className="relative z-10 flex items-center gap-2 font-medium tracking-wide">
                    Checkout →
                  </span>

                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition duration-300"></span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;