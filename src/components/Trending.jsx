import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productService";
import ProductCard from "./ProductCard";

function Trending() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10">Error</p>;

  const trending = data.slice(0, 4);

  return (
    <div className="px-6 md:px-10 ">

      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-wide text-gray-900 text-center">
          Trending Items
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-10">
        {trending.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>

    </div>
  );
}

export default Trending;