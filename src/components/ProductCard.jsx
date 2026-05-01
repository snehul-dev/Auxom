import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { updateUserCart } from "../services/userService";
import toast from "react-hot-toast";

function ProductCard({ item }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  async function handleAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation(); // 🔥 KEY FIX

    if (!user) {
      toast.error("Please login first");
      return;
    }

    const existing = user.cart?.find(
      (i) => i.productId === item.id
    );

    let updatedCart;

    if (existing) {
      updatedCart = user.cart.map((i) =>
        i.productId === item.id
          ? { ...i, qty: i.qty + 1 }
          : i
      );
    } else {
      updatedCart = [
        ...(user.cart || []),
        {
          productId: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          qty: 1,
        },
      ];
    }

    try {
      const updatedUser = await updateUserCart(user.id, updatedCart);
      dispatch(login(updatedUser));
      toast.success("Added to cart");
    } catch {
      toast.error("Failed to add");
    }
  }

  return (
    <div
      onClick={(e) => {
        if (e.target.closest("button")) return;
        navigate(`/products/${item.id}`);
      }}
      className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer"
    >
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
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleAdd(e);
            }}
            className="mt-3 w-full bg-black text-white py-2 rounded-lg flex items-center justify-center
            gap-2 hover:bg-gray-900 transition duration-300 shadow-md hover:shadow-lg"
          >
            Add <span className="text-lg">🛒</span>
          </button>
        ) : (
          <button
            type="button"
            disabled
            className="mt-3 w-full bg-white text-red-600 border border-red-600 py-2 rounded-lg flex items-center justify-center
            gap-2 cursor-not-allowed shadow-md"
          >
            Out Of Stock
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;