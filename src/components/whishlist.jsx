import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { removeFromWishlist } from "../redux/slices/whishlistSlice";
import { addToCart } from "../redux/slices/cartSlice";

function Wishlist() {
  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const dispatch = useDispatch();

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">
            Your Wishlist ❤️
          </h1>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow">
              <p className="text-gray-500 text-lg">
                Your wishlist is empty 🤍
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-48 w-full object-cover rounded-lg"
                  />

                  <h2 className="mt-3 font-semibold text-gray-800">
                    {item.name}
                  </h2>

                  <p className="text-gray-600 mt-1">
                    ₹{item.price}
                  </p>

                  {/* ⭐ Rating */}
                  <div className="text-yellow-500 text-lg">
                    {"★".repeat(Math.floor(item.rating))}
                    {"☆".repeat(
                      5 - Math.floor(item.rating)
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() =>
                        dispatch(addToCart(item))
                      }
                      className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-900"
                    >
                      Add 🛒
                    </button>

                    <button
                      onClick={() =>
                        dispatch(removeFromWishlist(item.id))
                      }
                      className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Wishlist;