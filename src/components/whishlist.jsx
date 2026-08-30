import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { removeFromWishlist } from "../redux/slices/whishlistSlice";
import { setCart } from "../redux/slices/cartSlice";
import Footer from "./Footer";
import Backbutton from "./Backbutton";
import toast from "react-hot-toast";
import {
  addToCartAPI,
  updateCartItem,
} from "../services/cartService";
import { useNavigate } from "react-router-dom";
import {
  removeFromWishlist as removeWishlistApi,
} from "../services/wishlistService";

function Wishlist() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const cartItems = useSelector(
    (state) => state?.cart.items
  );

  const user = useSelector(
    (state) => state?.auth.user
  );

  // Add wishlist product to cart
  const handleCart = async (e, item) => {
    e.stopPropagation();

    // User must be logged in
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      // Check whether this product already exists in cart
      const existing = cartItems.find(
        (i) => i.productId === item.productId
      );

      // Product already exists in cart
      if (existing) {
        const updatedCart = await updateCartItem(
          existing.cartItemId,
          existing.quantity + 1
        );

        // Backend returns complete CartDto
        dispatch(setCart(updatedCart));

        return;
      }

      // Product does not exist in cart
      const cartItem = {
        productId: item.productId,
        quantity: 1,
      };

      // Backend creates new CartItem
      // and returns complete CartDto
      const savedCart = await addToCartAPI(cartItem);

      // Update Redux with complete cart
      dispatch(setCart(savedCart));

    } catch (error) {
      console.error(
        "Failed to add item to cart:",
        error
      );
    }
  };

  // Remove product from wishlist
  const handleWishlistRemove = async (productId) => {
    try {
      await removeWishlistApi(productId);

      // Update Redux wishlist
      dispatch(removeFromWishlist(productId));

    } catch (error) {
      console.error(
        "Failed to remove item from wishlist:",
        error
      );
    }
  };

  return (
    <>
      <Navbar />

      <Backbutton />

      <div className="bg-gray-50 min-h-screen py-10 px-4">
        <div className="max-w-5xl mx-auto">

          <h1 className="text-3xl font-bold mb-8 text-gray-800">
            Your Wishlist ❤️
          </h1>

          {wishlistItems?.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow">
              <p className="text-gray-500 text-lg">
                Your wishlist is empty 🤍
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

              {wishlistItems?.map((item) => (

                <div
                  key={item.wishlistId}
                  className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition"
                >

                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="h-48 w-full object-cover rounded-lg"
                  />

                  {/* Product Name */}
                  <h2 className="mt-3 font-semibold text-gray-800">
                    {item.productName}
                  </h2>

                  {/* Product Price */}
                  <p className="text-gray-600 mt-1">
                    ₹{item.productPrice}
                  </p>

                  {/* Rating */}
                  <div className="text-yellow-500 text-lg">
                    {"★".repeat(
                      Math.floor(item.rating || 0)
                    )}

                    {"☆".repeat(
                      5 - Math.floor(item.rating || 0)
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 mt-4">

                    {((item.inStock ?? item.InStock) === false) ? (

                      // Out of stock
                      <button
                        type="button"
                        onClick={() =>
                          toast(
                            "We'll notify you when this item is back in stock."
                          )
                        }
                        className="flex-1 border border-blue-500 text-blue-500 py-2 rounded-lg hover:bg-blue-50"
                      >
                        Notify Me
                      </button>

                    ) : (

                      // In stock
                      <button
                        type="button"
                        onClick={(e) =>
                          handleCart(e, item)
                        }
                        className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-900"
                      >
                        Add 🛒
                      </button>

                    )}

                    {/* Remove from wishlist */}
                    <button
                      type="button"
                      onClick={() =>
                        handleWishlistRemove(
                          item.productId
                        )
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

      <Footer />
    </>
  );
}

export default Wishlist;