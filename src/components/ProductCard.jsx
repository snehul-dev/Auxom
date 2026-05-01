import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

function ProductCard({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <div
      onClick={() => navigate(`/products/${item.id}`)}
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

        {item.InStock ? <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addToCart(item));
          }}
          className="mt-3 w-full bg-black text-white py-2 rounded-lg"
        >
          Add 🛒
        </button> :<button className="mt-3 w-full bg-white text-red py-2 rounded-lg">Out Of Stock</button>}

      </div>
    </div>
  );
}

export default ProductCard;