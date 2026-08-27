import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productService";
import ProductCard from "./ProductCard";

function Trending() {
  const { data,isLoading,isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if(isLoading){
    return <h1>Loading...</h1>
  }
  if(isError){
    return <h1>Error Loading products</h1>
  }
  const products = data?.items||[]

   const trend = [...products]?.sort((a,b)=>b.rating-a.rating)
  const trending = trend.slice(0,4)
  return (
    <div className="px-6 md:px-10">
      <h1 className="text-center text-4xl font-semibold mb-8 tracking-wide">Trending Items</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {trending.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Trending;