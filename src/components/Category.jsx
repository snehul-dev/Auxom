import { useNavigate } from "react-router-dom";
import tshirtImg from "../assets/category_tshirt.jpeg";
import shirtImg from "../assets/category_shirt.png";
import pantImg from "../assets/category_pant.jpeg";


const categories = [
  { id: 1, name: "T-Shirts", image: tshirtImg },
  { id: 2, name: "Shirts", image: shirtImg },
  { id: 3, name: "Pants", image: pantImg },
];

function Category() {
  const navigate = useNavigate();

  return (

    <div className="px-10 py-16" id="category">

      <h1 className="text-center text-4xl md:text-5xl font-semibold mb-12 tracking-wide">
        Shop the Drop
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/products?category=${item.name}`)}
            className="relative group cursor-pointer overflow-hidden rounded-xl"
          >

            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[400px] object-cover group-hover:scale-105 transition duration-500"
            />

            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-300"></div>

            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-2xl font-medium tracking-wide">
                {item.name}
              </h2>

              <p className="text-sm opacity-80 mt-1 group-hover:translate-x-1 transition">
                Shop Now →
              </p>
            </div>

          </div>
        ))}
      </div>

      <div className="flex justify-end mt-10">
        <button
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 text-sm font-medium group transition"
        >
          <span className="underline group-hover:no-underline transition duration-300">
            Show All Products
          </span>

          <span className="transform transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </button>
      </div>

    </div>
  );
}

export default Category;