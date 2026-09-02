import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import Backbutton from "./Backbutton";

function Products() {
  const [searchParams] = useSearchParams();

  // URL parameters
  const category = searchParams.get("category") || "";
  const searchQuery = searchParams.get("search") || "";

  // Filters
  const [pricefilter, setPriceFilter] = useState("");
  const [sorted, setSorted] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 9;

  // ------------------------------------------------
  // Reset page when URL search/category changes
  // ------------------------------------------------

  useEffect(() => {
    setCurrentPage(1);
  }, [category, searchQuery]);

  // ------------------------------------------------
  // Price filter
  // ------------------------------------------------

  let minPrice;
  let maxPrice;

  if (pricefilter === "below999") {
    maxPrice = 999;
  }

  if (pricefilter === "below1499") {
    maxPrice = 1499;
  }

  if (pricefilter === "below1999") {
    maxPrice = 1999;
  }

  if (pricefilter === "above2000") {
    minPrice = 2000;
  }

  // ------------------------------------------------
  // Rating filter
  // ------------------------------------------------

  let minRating;

  if (ratingFilter === "4") {
    minRating = 4;
  }

  if (ratingFilter === "3") {
    minRating = 3;
  }

  // ------------------------------------------------
  // Sorting
  // ------------------------------------------------

  let sortBy;

  if (sorted === "byPriceInc") {
    sortBy = "priceasc";
  }

  if (sorted === "byPriceDec") {
    sortBy = "pricedesc";
  }

  // ------------------------------------------------
  // Category
  // ------------------------------------------------

  const finalCategory = categoryFilter || category || undefined;

  // ------------------------------------------------
  // All filters
  // ------------------------------------------------

  const filters = {
    search: searchQuery || undefined,
    category: finalCategory,
    minPrice,
    maxPrice,
    minRating,
    sortBy,
  };

  // ------------------------------------------------
  // Get products from backend
  // ------------------------------------------------

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", currentPage, filters],

    queryFn: () =>
      getProducts(
        currentPage,
        productsPerPage,
        filters
      ),
  });

  // ------------------------------------------------
  // Loading
  // ------------------------------------------------

  if (isLoading) {
    return (
      <>
        <Navbar />

        <div className="flex justify-center items-center min-h-[60vh]">
          <h1 className="text-xl">
            Loading...
          </h1>
        </div>

        <Footer />
      </>
    );
  }

  // ------------------------------------------------
  // Error
  // ------------------------------------------------

  if (isError) {
    return (
      <>
        <Navbar />

        <div className="flex justify-center items-center min-h-[60vh]">
          <h1 className="text-xl text-red-500">
            Error loading products
          </h1>
        </div>

        <Footer />
      </>
    );
  }

  // ------------------------------------------------
  // Backend response
  // ------------------------------------------------

  const products = data?.items || [];
  const totalPages = data?.totalPages || 0;

  // ------------------------------------------------
  // Reset all filters
  // ------------------------------------------------

  const clearFilters = () => {
    setPriceFilter("");
    setSorted("");
    setRatingFilter("");
    setCategoryFilter("");
    setCurrentPage(1);
  };

  return (
    <>
      <Navbar />

      <div className="px-6 py-10">

        {/* =========================
            BACK BUTTON
        ========================== */}

        <div className="flex justify-between mb-6">
          <Backbutton />
        </div>

        <div className="flex gap-6">

          {/* =========================
              FILTER SIDEBAR
          ========================== */}

          <div className="w-60 bg-white p-4 rounded-lg shadow space-y-6 h-fit mt-15">

            {/* =========================
                SORT
            ========================== */}

            <div>
              <h3 className="font-semibold mb-2">
                Sort
              </h3>

              <div className="space-y-1 text-sm">

                <p
                  onClick={() => {
                    setSorted("byPriceInc");
                    setCurrentPage(1);
                  }}
                  className={`cursor-pointer hover:text-black ${
                    sorted === "byPriceInc"
                      ? "text-black font-medium"
                      : "text-gray-600"
                  }`}
                >
                  Price: Low → High
                </p>

                <p
                  onClick={() => {
                    setSorted("byPriceDec");
                    setCurrentPage(1);
                  }}
                  className={`cursor-pointer hover:text-black ${
                    sorted === "byPriceDec"
                      ? "text-black font-medium"
                      : "text-gray-600"
                  }`}
                >
                  Price: High → Low
                </p>

              </div>
            </div>

            {/* =========================
                PRICE
            ========================== */}

            <div>
              <h3 className="font-semibold mb-2">
                Price
              </h3>

              <div className="space-y-1 text-sm">

                <p
                  onClick={() => {
                    setPriceFilter("below999");
                    setCurrentPage(1);
                  }}
                  className={`cursor-pointer hover:text-black ${
                    pricefilter === "below999"
                      ? "text-black font-medium"
                      : "text-gray-600"
                  }`}
                >
                  Below ₹999
                </p>

                <p
                  onClick={() => {
                    setPriceFilter("below1499");
                    setCurrentPage(1);
                  }}
                  className={`cursor-pointer hover:text-black ${
                    pricefilter === "below1499"
                      ? "text-black font-medium"
                      : "text-gray-600"
                  }`}
                >
                  Below ₹1499
                </p>

                <p
                  onClick={() => {
                    setPriceFilter("below1999");
                    setCurrentPage(1);
                  }}
                  className={`cursor-pointer hover:text-black ${
                    pricefilter === "below1999"
                      ? "text-black font-medium"
                      : "text-gray-600"
                  }`}
                >
                  Below ₹1999
                </p>

                <p
                  onClick={() => {
                    setPriceFilter("above2000");
                    setCurrentPage(1);
                  }}
                  className={`cursor-pointer hover:text-black ${
                    pricefilter === "above2000"
                      ? "text-black font-medium"
                      : "text-gray-600"
                  }`}
                >
                  Above ₹2000
                </p>

              </div>
            </div>

            {/* =========================
                RATING
            ========================== */}

            <div>
              <h3 className="font-semibold mb-2">
                Rating
              </h3>

              <div className="space-y-1 text-sm">

                <p
                  onClick={() => {
                    setRatingFilter("4");
                    setCurrentPage(1);
                  }}
                  className={`cursor-pointer hover:text-black ${
                    ratingFilter === "4"
                      ? "text-black font-medium"
                      : "text-gray-600"
                  }`}
                >
                  4★ & above
                </p>

                <p
                  onClick={() => {
                    setRatingFilter("3");
                    setCurrentPage(1);
                  }}
                  className={`cursor-pointer hover:text-black ${
                    ratingFilter === "3"
                      ? "text-black font-medium"
                      : "text-gray-600"
                  }`}
                >
                  3★ & above
                </p>

              </div>
            </div>

            {/* =========================
                CATEGORY
            ========================== */}

            <div>
              <h3 className="font-semibold mb-2">
                Category
              </h3>

              <div className="space-y-1 text-sm">

                <p
                  onClick={() => {
                    setCategoryFilter("Pant");
                    setCurrentPage(1);
                  }}
                  className={`cursor-pointer hover:text-black ${
                    categoryFilter === "Pants"
                      ? "text-black font-medium"
                      : "text-gray-600"
                  }`}
                >
                  Pants
                </p>

                <p
                  onClick={() => {
                    setCategoryFilter("Shirt");
                    setCurrentPage(1);
                  }}
                  className={`cursor-pointer hover:text-black ${
                    categoryFilter === "Shirts"
                      ? "text-black font-medium"
                      : "text-gray-600"
                  }`}
                >
                  Shirts
                </p>

                <p
                  onClick={() => {
                    setCategoryFilter("T-Shirts");
                    setCurrentPage(1);
                  }}
                  className={`cursor-pointer hover:text-black ${
                    categoryFilter === "T-Shirts"
                      ? "text-black font-medium"
                      : "text-gray-600"
                  }`}
                >
                  T-Shirts
                </p>

              </div>
            </div>

            {/* =========================
                CLEAR FILTERS
            ========================== */}

            <button
              onClick={clearFilters}
              className="w-full border border-black py-2 rounded text-sm hover:bg-black hover:text-white transition"
            >
              Clear Filters
            </button>

          </div>

          {/* =========================
              PRODUCTS SECTION
          ========================== */}

          <div className="flex-1">

            {/* Heading */}

            <h1 className="text-3xl mb-6">

              {category
                ? category
                : searchQuery
                ? `Search results for "${searchQuery}"`
                : "All Products"}

            </h1>

            {/* =========================
                PRODUCT LIST
            ========================== */}

            {products.length === 0 ? (

              <p className="text-gray-500 text-center mt-10">
                No products found
              </p>

            ) : (

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

                {products.map((item) => (

                  <ProductCard
                    key={item.id}
                    item={item}
                  />

                ))}

              </div>

            )}

            {/* =========================
                PAGINATION
            ========================== */}

            {totalPages > 0 && (

              <div className="flex justify-center items-center gap-3 mt-10">

                {/* Previous */}

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

                {/* Page Numbers */}

                {[...Array(totalPages)].map(
                  (_, index) => {

                    const page = index + 1;

                    return (
                      <button
                        key={page}
                        onClick={() =>
                          setCurrentPage(page)
                        }
                        className={`px-4 py-2 rounded ${
                          currentPage === page
                            ? "bg-black text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {page}
                      </button>
                    );

                  }
                )}

                {/* Next */}

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

            )}

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Products;