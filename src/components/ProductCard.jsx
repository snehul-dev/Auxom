import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productService";
import { useNavigate } from "react-router-dom";

function ProductCard({ category, setCategory }) {
  const navigate = useNavigate()
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-center">Error loading products</p>;

  const filteredProducts =
    category === "all"
      ? data
      : data.filter(
        (item) =>
          item.category.toLowerCase() === category.toLowerCase()
      );

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    return (
      <>
        {"★".repeat(fullStars)}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  return (
    <div id="products">
      <h1 className="text-center text-4xl md:text-5xl font-semibold mb-10">
        {category === "all" ? "All Products" : category}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">

        {filteredProducts.map((item) => (
          <div
            key={item.id}
            onClick={()=>navigate(`/products/${item.id}`)}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 cursor-pointer group hover:-translate-y-1"
          >

            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300"></div>
            </div>

            <div className="p-4">
              <h2 className="text-lg font-semibold group-hover:text-gray-700">
                {item.name}
              </h2>

              <div className="flex items-center gap-1 text-yellow-500 mt-1">
                {renderStars(item.rating || 4)}
                <span className="text-sm text-gray-500">
                  ({item.rating || 4})
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="font-semibold text-black text-lg">
                  ₹{item.price}
                </span>

                <button className="bg-black text-white px-3 py-2 rounded-md text-sm hover:bg-gray-800 active:scale-95 transition">
                  Add
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
      <div className="text-center my-10">
        {category !== "all" && (
          <button
            onClick={() => setCategory("all")}
            className="px-6 py-2 border border-black rounded-full 
                 text-sm font-medium tracking-wide
                 hover:bg-black hover:text-white 
                 transition duration-300 ease-in-out
                 active:scale-95"
          >
            Show All Products
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;