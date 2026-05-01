import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl mb-6 font-semibold">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-4 mb-4 border p-3 rounded"
              >
                <img
                  src={item.image}
                  className="w-20 h-20 object-cover rounded"
                />

                <div className="flex-1">
                  <h2 className="font-medium">{item.name}</h2>
                  <p>₹{item.price}</p>

                  {/* QUANTITY CONTROL */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        dispatch(decreaseQty(item.productId))
                      }
                      className="px-3 py-1 border rounded"
                    >
                      -
                    </button>

                    <span>{item.qty}</span>

                    <button
                      onClick={() =>
                        dispatch(increaseQty(item.productId))
                      }
                      className="px-3 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* REMOVE BUTTON */}
                <button
                  onClick={() =>
                    dispatch(removeFromCart(item.productId))
                  }
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* TOTAL + PAYMENT */}
            <div className="mt-6 border-t pt-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Total: ₹{total}
              </h2>

              <button
                onClick={() => navigate("/payment")}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900"
              >
                Proceed to Payment 💳
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;