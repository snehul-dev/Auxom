import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { toggleWishlist } from "../redux/slices/whishlistSlice"

function ProductCard({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const isLiked = wishlistItems.some(
    (i) => i.id === item.id
  );

  return (
    <div
      onClick={() => navigate(`/products/${item.id}`)}
      className="relative bg-white rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition"
    >
      {/* ❤️ Wishlist */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(toggleWishlist(item));
        }}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-md hover:scale-110 transition"
      >
        <span
          className={`text-xl ${
            isLiked ? "text-red-500 scale-110" : "text-gray-400"
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

        {item.InStock ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addToCart(item));
            }}
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