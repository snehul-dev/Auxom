import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import Footer from "./Footer";
import Backbutton from "./Backbutton";

function Products() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "all";

  const [sorted, setSorted] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // 🔥 Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.toLowerCase());
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error</h1>;

  // 🔹 Category filter
  const filtered =
    category === "all"
      ? data
      : data.filter(
          (item) =>
            item.category.toLowerCase() === category.toLowerCase()
        );

  // 🔥 Search filter
  const searchedProducts = filtered.filter((item) =>
    item.name.toLowerCase().includes(debouncedSearch)
  );

  // 🔹 Sorting
  let sortedProducts = [...searchedProducts];

  if (sorted === "byPriceInc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sorted === "byPriceDec") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  if (sorted === "rating") {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <>
      <Navbar />
      <Backbutton />

      <div className="px-6 py-10">
        {/* 🔥 SEARCH + SORT */}
        <div className="flex justify-between items-center mb-4 gap-4 flex-wrap">
          
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* SORT */}
          <select
            className="appearance-none bg-white border border-gray-300 text-sm px-4 py-2 rounded-lg shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-black cursor-pointer transition"
            onChange={(e) => setSorted(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="byPriceInc">Price: Low → High</option>
            <option value="byPriceDec">Price: High → Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <h1 className="text-center text-3xl mb-8">
          {category === "all" ? "All Products" : category}
        </h1>

        {/* PRODUCTS */}
        {sortedProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            No products found 
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sortedProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Products;