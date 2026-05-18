import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import Footer from "./Footer";
import Backbutton from "./Backbutton";

function Products() {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") || "all";
  const searchQuery = searchParams.get("search") || "";

  const [pricefilter, setPriceFilter] = useState("");
  const [sorted, setSorted] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 9;

  const { data, isLoading, isError } = useQuery({
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
          item.category.toLowerCase() ===
          category.toLowerCase()
      );

  const searchedProducts = filtered.filter(
    (item) =>
      item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  let finalProducts = [...searchedProducts];

  if (pricefilter == "below999") {
    finalProducts = finalProducts.filter(
      (item) => item.price < 999
    );
  }

  if (pricefilter == "below1499") {
    finalProducts = finalProducts.filter(
      (item) => item.price <= 1499
    );
  }

  if (pricefilter == "below1999") {
    finalProducts = finalProducts.filter(
      (item) => item.price <= 1999
    );
  }

  if (pricefilter == "above2000") {
    finalProducts = finalProducts.filter(
      (item) => item.price >= 2000
    );
  }

  if (ratingFilter == "4") {
    finalProducts = finalProducts.filter(
      (item) => item.rating >= 4
    );
  }

  if (ratingFilter == "3") {
    finalProducts = finalProducts.filter(
      (item) => item.rating >= 3
    );
  }

  if (categoryFilter) {
    finalProducts = finalProducts.filter(
      (item) =>
        item.category.toLowerCase() ===
        categoryFilter.toLowerCase()
    );
  }

  if (sorted === "byPriceInc") {
    finalProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sorted === "byPriceDec") {
    finalProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  const totalPages = Math.ceil(
    finalProducts.length / productsPerPage
  );

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const selectedProducts =
    finalProducts.slice(
      startIndex,
      startIndex + productsPerPage
    );

  return (
    <>
      <Navbar />

      <div className="px-6 py-10">
        <div className="flex justify-between">
          <Backbutton />
        </div>

        <div className="flex gap-6">

          <div className="w-60 bg-white p-4 rounded-lg shadow space-y-6 h-fit mt-15">

            <div>
              <h3 className="font-semibold mb-2">
                Sort
              </h3>

              <div className="space-y-1 text-sm">
                <p
                  onClick={() =>
                    setSorted("byPriceInc")
                  }
                  className="cursor-pointer hover:text-black text-gray-600"
                >
                  Price: Low → High
                </p>

                <p
                  onClick={() =>
                    setSorted("byPriceDec")
                  }
                  className="cursor-pointer hover:text-black text-gray-600"
                >
                  Price: High → Low
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                Price
              </h3>

              <div className="space-y-1 text-sm">

                <p
                  onClick={() =>
                    setPriceFilter("below999")
                  }
                  className="cursor-pointer text-gray-600 hover:text-black"
                >
                  Below ₹999
                </p>

                <p
                  onClick={() =>
                    setPriceFilter("below1499")
                  }
                  className="cursor-pointer text-gray-600 hover:text-black"
                >
                  Below ₹1499
                </p>

                <p
                  onClick={() =>
                    setPriceFilter("below1999")
                  }
                  className="cursor-pointer text-gray-600 hover:text-black"
                >
                  Below ₹1999
                </p>

                <p
                  onClick={() =>
                    setPriceFilter("above2000")
                  }
                  className="cursor-pointer text-gray-600 hover:text-black"
                >
                  Above ₹2000
                </p>

              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                Rating
              </h3>

              <div className="space-y-1 text-sm">

                <p
                  onClick={() =>
                    setRatingFilter("4")
                  }
                  className="cursor-pointer text-gray-600 hover:text-black"
                >
                  4★ & above
                </p>

                <p
                  onClick={() =>
                    setRatingFilter("3")
                  }
                  className="cursor-pointer text-gray-600 hover:text-black"
                >
                  3★ & above
                </p>

              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                Category
              </h3>

              <div className="space-y-1 text-sm">

                <p
                  onClick={() =>
                    setCategoryFilter("Pants")
                  }
                  className="cursor-pointer text-gray-600 hover:text-black"
                >
                  Pants
                </p>

                <p
                  onClick={() =>
                    setCategoryFilter("Shirts")
                  }
                  className="cursor-pointer text-gray-600 hover:text-black"
                >
                  Shirts
                </p>

                <p
                  onClick={() =>
                    setCategoryFilter("T-Shirts")
                  }
                  className="cursor-pointer text-gray-600 hover:text-black"
                >
                  T-Shirts
                </p>

              </div>
            </div>

          </div>

          <div className="flex-1">

            <h1 className="text-3xl mb-6">
              {category === "all"
                ? "All Products"
                : category}
            </h1>

            {finalProducts.length === 0 ? (
              <p className="text-gray-500 text-center">
                No products found
              </p>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

                  {selectedProducts.map((item) => (
                    <ProductCard
                      key={item.id}
                      item={item}
                    />
                  ))}

                </div>

                <div className="flex justify-center items-center gap-3 mt-10">

                  <button
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage(
                        currentPage - 1
                      )
                    }
                    className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
                  >
                    Prev
                  </button>

                  {[...Array(totalPages)].map(
                    (_, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          setCurrentPage(
                            index + 1
                          )
                        }
                        className={`px-4 py-2 rounded ${currentPage ===
                            index + 1
                            ? "bg-black text-white"
                            : "bg-gray-200"
                          }`}
                      >
                        {index + 1}
                      </button>
                    )
                  )}

                  <button
                    disabled={
                      currentPage === totalPages
                    }
                    onClick={() =>
                      setCurrentPage(
                        currentPage + 1
                      )
                    }
                    className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
                  >
                    Next
                  </button>

                </div>
              </>
            )}

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Products;