import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { setCart } from "../redux/slices/cartSlice";
import { toggleWishlist } from "../redux/slices/whishlistSlice"
import { addToCartAPI, updateCartItem } from "../services/cartService";
import { addToWishlistAPI, removeFromWishlist } from "../services/wishlistService";



function ProductCard({ item }) {
  const user = useSelector((state) => state?.auth.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((s) => s?.cart.items)
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isLiked = wishlistItems?.some(
    (i) => i.productId === item.id
  );

  async function handleAdd(e) {
    e.stopPropagation();

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const existing = cartItems.find(
        (i) => i.productId === item.id
      );

      if (existing) {
        const updatedCart = await updateCartItem(
          existing.cartItemId,
          existing.quantity + 1
        );

        dispatch(setCart(updatedCart));
        return;
      }

      const cartItem = {
        productId: item.id,
        quantity: 1,
      };

      const savedCart = await addToCartAPI(cartItem);

      dispatch(setCart(savedCart));

    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  }


  const handleWishlist = async (e) => {
    e.stopPropagation();

    if (!user) {
      navigate("/login");
      return;
    }
    const existing = wishlistItems.find((i) => i.productId === item.id)
    if (existing) {
      await removeFromWishlist(existing.productId)
      dispatch(toggleWishlist(existing))
    } else {
      const savedWishlist =
        await addToWishlistAPI(item.id);

      dispatch(toggleWishlist(savedWishlist));

    }

  };
  return (
    <div
      onClick={() => navigate(`/products/${item.id}`)}
      className="relative bg-white rounded-xl overflow-hidden shadow-md cursor-pointer 
      transition-all duration-300 ease-in-out 
      hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]"
    >
      <button
        onClick={handleWishlist}
        className="absolute top-4 right-4 z-10 p-1 rounded-full bg-white/80 backdrop-blur-md shadow-md hover:scale-110 transition"
      >
        <span
          className={`text-md ${isLiked ? "text-red-500 scale-110" : "text-gray-400"
            }`}
        >
          {isLiked ? "❤️" : "🤍"}
        </span>
      </button>

      <img
        src={item.image}
        alt={item.name}
        className="h-60 w-full object-cover"
      />

      <div className="p-3">
        <h2 className="font-semibold">{item.name}</h2>
        <p>₹{item.price}</p>

        <div className="text-yellow-500 text-lg">
          {"★".repeat(Math.floor(item.rating))}
          {"☆".repeat(5 - Math.floor(item.rating))}
        </div>

        {item.inStock ? (
          <button
            onClick={handleAdd}
            className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900"
          >
            Add 🛒
          </button>
        ) : (
          <button className="mt-3 w-full bg-gray-100 text-red-500 py-2 rounded-lg">
            Out Of Stock
          </button>
        )}
      </div>
    </div>
  );


}






export default ProductCard;