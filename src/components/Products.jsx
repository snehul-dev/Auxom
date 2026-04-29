import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";

function Products() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "all";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading)
    return (
      <h1 className="text-center mt-20 text-lg text-gray-600">
        Loading...
      </h1>
    );

  if (isError)
    return (
      <h1 className="text-center mt-20 text-lg text-red-500">
        Error loading products
      </h1>
    );

  const filtered =
    category === "all"
      ? data
      : data.filter(
        (item) =>
          item.category.toLowerCase() === category.toLowerCase()
      );

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-12 py-10 min-h-screen bg-gray-50">

        <div className="mb-10 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-wide text-gray-900  ">
            {category === "all" ? "All Products" : category}
          </h1>
        </div>
        <p className="text-sm text-gray-500 mb-5 text-end">
          {filtered.length} items
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">

          {filtered.map((item) => (
            <div
              key={item.id}
              className="transform transition duration-300 ease-in-out hover:-translate-y-2"
            >
              <ProductCard item={item} />
            </div>
          ))}

        </div>

      </div>
    </>
  );
}

export default Products;