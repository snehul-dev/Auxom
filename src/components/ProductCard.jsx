import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productService";

function ProductCard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-center">Error loading products</p>;

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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl overflow-hidden 
             shadow-md hover:shadow-2xl 
             transition duration-300 
             cursor-pointer group 
             hover:-translate-y-1"
        >
          
          <div className="relative overflow-hidden">

           
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-60 object-cover 
                 transition duration-500 
                 group-hover:scale-110"
            />

            
            <div className="absolute inset-0 bg-black/0 
                    group-hover:bg-black/10 
                    transition duration-300"></div>

           
     
          </div>

         
          <div className="p-4">
            <h2 className="text-lg font-semibold group-hover:text-gray-700 transition">
              {item.name}
            </h2>

           
            <div className="flex items-center gap-1 text-yellow-500 mt-1">
              {renderStars(item.rating || 4)}
              <span className="text-sm text-gray-500">
                ({item.rating || 4})
              </span>
            </div>

           
            <div className="mt-2">
              <span className="font-bold text-black">₹{item.price}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductCard;