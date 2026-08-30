import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProduct } from "../services/productService";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, setCart } from "../redux/slices/cartSlice";
import { toggleWishlist } from "../redux/slices/whishlistSlice"
import Footer from "./Footer";
import { addToCartAPI, updateCartItem } from "../services/cartService";
import { addToWishlistAPI, removeFromWishlist } from "../services/wishlistService";


function ProductDisplay() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector(state => state?.auth.user)
  const cartItems = useSelector((s) => s?.cart.items)

  const [selectedSize, setSelectedSize] = useState(null);

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getSingleProduct(id),
    enabled: !!id,
  });
  console.log("Product ID:", id);
  console.log("Product data:", product);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isLiked = wishlistItems?.some((item) => item.productId === product?.id);
  const handleWishlist = async (e) => {
    e.stopPropagation();

    if (!user) {
      navigate("/login");
      return;
    }

    const existing = wishlistItems.find(
      (i) => i.productId === product.id
    );
    console.log(existing);

    if (existing) {
      await removeFromWishlist(existing.productId);

      dispatch(toggleWishlist(existing));

      return;
    }

    const savedWishlist = await addToWishlistAPI(product.id);

    dispatch(toggleWishlist(savedWishlist));
  };
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error loading product</h1>;
  if (!product) return <h1>Product Not Found</h1>;

  const handleCart = async () => {
  if (!user) {
    navigate("/login");
    return;
  }

  try {
    const existing = cartItems.find(
      (i) => i.productId === product.id
    );

    if (existing) {
      const updatedCart = await updateCartItem(
        existing.cartItemId,
        existing.quantity + 1
      );

      dispatch(setCart(updatedCart));
      return;
    }

    const cartItem = {
      productId: product.id,
      quantity: 1,
    };

    const savedCart = await addToCartAPI(cartItem);

    dispatch(setCart(savedCart));

  } catch (error) {
    console.error("Failed to add product to cart:", error);
  }
};
  const handleBuy = () => {
    if (!user) {
      navigate("/login")
    } else {
      navigate("/payment")
    }
  }

  return (
    <>
      <Navbar />

      <div className="h-screen grid md:grid-cols-2">
        <div className="h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
          />
        </div>

        <div className="h-full flex items-center justify-center bg-white px-6 md:px-10 overflow-y-auto relative">
          <button
            onClick={handleWishlist}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-md hover:scale-110 transition"
          >
            <span
              className={`text-xl ${isLiked
                ? "text-red-500 scale-110"
                : "text-gray-400"
                }`}
            >
              {isLiked ? "❤️" : "🤍"}
            </span>
          </button>

          <div className="w-full max-w-md flex flex-col gap-3 mb-10">
            <h2 className="text-3xl font-semibold text-gray-900">
              {product.name}
            </h2>

            <p className="text-2xl font-bold text-black">
              ₹{product.price}
            </p>

            {product.inStock ? (
              <p className="text-green-600 font-medium">
                In Stock
              </p>
            ) : (
              <p className="text-red-600 font-medium">
                Out Of Stock
              </p>
            )}

            <div className="text-yellow-500 text-lg">
              {"★".repeat(Math.floor(product.rating || 4))}
              {"☆".repeat(
                5 - Math.floor(product.rating || 4)
              )}
            </div>

            <p className="text-sm text-gray-600">
              {product.color}
            </p>

            <p className="text-sm text-gray-600">
              {product.description}
            </p>

            <div>
              <p className="font-medium mb-3">Select Size</p>
              <div className="flex gap-3 flex-wrap">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-full ${selectedSize === size
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {product.inStock && (
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleCart}
                  className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-900 "
                >
                  Add to Cart 🛒
                </button>

                <button onClick={handleBuy} className="w-full border border-black py-3 rounded-full hover:bg-black hover:text-white">
                  Buy Now
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

export default ProductDisplay;