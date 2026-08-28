import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { removeFromWishlist } from "../redux/slices/whishlistSlice";
import { addToCart } from "../redux/slices/cartSlice";
import Footer from "./Footer";
import Backbutton from "./Backbutton";
import toast from "react-hot-toast";
import { addToCartAPI, updateCartItem } from "../services/cartService";
import { useNavigate } from "react-router-dom";
import {removeFromWishlist as removeWishlistApi} from "../services/wishlistService"

function Wishlist() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  console.log(wishlistItems);
  const cartItems = useSelector((s) => s?.cart.items)
  const user = useSelector((s) => s?.auth.user)
  const handleCart = async (e, item) => {
    e.stopPropagation();


    if (!user) {
      navigate("/login");
      return;
    }

    const existing = cartItems.find(
      (i) => i.productId === item.productId
    );

    if (existing) {
      const updatedItem = {
        ...existing,
        qty: existing.qty + 1,
      };

      await updateCartItem(existing.id, updatedItem);

      dispatch(addToCart({
        ...existing,
        qty: 1,
      }));

      return;
    }

    const { id, ...rest } = item;

    const cartItem = {
      ...rest,
      productId: id,
      userId: user.id,
      qty: 1,
    };

    const savedCartItem =
      await addToCartAPI(cartItem);

    dispatch(addToCart(savedCartItem));
  };
  const handleWhishlistRemove = async(ProductId)=>{
    await removeWishlistApi(ProductId)
    dispatch(removeFromWishlist(ProductId))
  }

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
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-48 w-full object-cover rounded-lg"
                  />

                  <h2 className="mt-3 font-semibold text-gray-800">
                    {item.productName}
                  </h2>

                  <p className="text-gray-600 mt-1">
                    ₹{item.productPrice}
                  </p>

                  <div className="text-yellow-500 text-lg">
                    {"★".repeat(Math.floor(item.rating))}
                    {"☆".repeat(
                      5 - Math.floor(item.rating)
                    )}
                  </div>

                  <div className="flex gap-2 mt-4">
                    {((item.inStock ?? item.InStock) === false) ? (
                      <>

                        <button
                          type="button"
                          onClick={() =>
                            toast("We'll notify you when this item is back in stock.")
                          }
                          className="flex-1 border border-blue-500 text-blue-500 py-2 rounded-lg hover:bg-blue-50"
                        >
                          Notify Me
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={(e) => handleCart(e, item)}
                          className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-900"
                        >
                          Add 🛒
                        </button>
                      </>
                    )}


                    <button
                      onClick={()=>handleWhishlistRemove(item.productId) }
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