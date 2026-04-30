import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";

function Products() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "all";
  const [sorted,setSorted] = useState("")

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error</h1>;

  const filtered =
    category === "all"
      ? data
      : data.filter(
          (item) =>
            item.category.toLowerCase() === category.toLowerCase()
        );
        let sortedProducts = [...filtered]
     if(sorted == "byPriceInc"){
      sortedProducts.sort((a,b)=>a.price - b.price)
     }
        
     if(sorted ==="byPriceDec"){
      sortedProducts.sort((a,b)=>b.price-a.price)
     }
     if(sorted ==="rating"){
      sortedProducts.sort((a,b)=>a.rating-b.rating)
     }

  return (
    <>
      <Navbar />
      <div className="px-6 py-10">
        <div className="flex justify-end mb-4">
          <select className="appearance-none bg-white border border-gray-300 text-sm px-4 py-2 pr-10 rounded-lg shadow-sm 
                 focus:outline-none focus:ring-2 focus:ring-black cursor-pointer transition" 
                 onClick={(e)=>setSorted(e.target.value)}  >
            <option value="">Sort By</option>
            <option value="byPriceInc">Price: Low → High</option>
            <option value="byPriceDec">Price: Low → High</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        <h1 className="text-center text-3xl mb-8">
          {category === "all" ? "All Products" : category}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {sortedProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;