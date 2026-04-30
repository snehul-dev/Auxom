import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function ProductCard({ item }) {
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

      {item.InStock &&   <button onClick={(e)=>e.stopPropagation} className="mt-3 w-full bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition duration-300 shadow-md hover:shadow-lg">
          <span>Add</span>
          <span className="text-lg">🛒</span>
        </button>}

      </div>
    </div>
  );
}

export default ProductCard;