import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProducts } from "../services/productService";
import { useState } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { updateUserCart } from "../services/userService";
import toast from "react-hot-toast";

function ProductDisplay() {
    const [selectedSize, setSelectedSize] = useState(null);
    const [liked, setLiked] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const { id } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    const product = data?.find((item) => String(item.id) === id);

    async function handleAddToCart(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (!user) {
            toast.error("Please login first");
            return;
        }

        if (!product.InStock) return;

        const existing = user.cart?.find(
            (i) => i.productId === product.id
        );

        let updatedCart;

        if (existing) {
            updatedCart = user.cart.map((i) =>
                i.productId === product.id
                    ? { ...i, qty: i.qty + 1 }
                    : i
            );
        } else {
            updatedCart = [
                ...(user.cart || []),
                {
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    qty: 1,
                },
            ];
        }

        try {
            const updatedUser = await updateUserCart(user.id, updatedCart);
            dispatch(login(updatedUser));

            toast.success("Added to cart");
        } catch {
            toast.error("Failed to add");
        }
    }

    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <h1>Error loading product</h1>;
    if (!product) return <h1>Product Not Found</h1>;

    return (
        <>
            <Navbar />

            <div className="h-screen grid md:grid-cols-2">
                {/* IMAGE */}
                <div className="h-full">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-500 transform hover:scale-110"
                    />
                </div>

                {/* DETAILS */}
                <div className="h-full flex items-center justify-center bg-white px-6 md:px-10 overflow-y-auto relative">
                    {/* LIKE */}
                    <button
                        type="button"
                        onClick={() => setLiked(!liked)}
                        className="absolute top-5 right-5 p-2 rounded-full bg-white shadow-md"
                    >
                        <span
                            className={`text-xl ${liked ? "text-red-500" : "text-gray-400"
                                }`}
                        >
                            {liked ? "❤️" : "🤍"}
                        </span>
                    </button>

                    <div className="w-full max-w-md flex flex-col gap-3 mb-10">
                        <h2 className="text-3xl font-semibold">{product.name}</h2>

                        <p className="text-2xl font-bold">₹{product.price}</p>

                        {product.InStock ? (
                            <p className="text-green-600 font-medium">In Stock</p>
                        ) : (
                            <p className="text-red-600 font-medium">Out Of Stock</p>
                        )}

                        <div className="text-yellow-500 text-lg">
                            {"★".repeat(Math.floor(product.rating || 4))}
                            {"☆".repeat(5 - Math.floor(product.rating || 4))}
                        </div>

                        <p className="text-sm text-gray-600">{product.color}</p>

                        <ul className="list-disc pl-5">
                            {product.description.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>

                        <div>
                            <p className="font-medium mb-2">Select Size</p>
                            <div className="flex gap-3 flex-wrap">
                                {["S", "M", "L", "XL", "XXL"].map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 border rounded-full text-sm ${selectedSize === size
                                            ? "bg-black text-white"
                                            : "hover:bg-black hover:text-white"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 mt-4">
                            {product.InStock ? (
                                <div className="flex gap-5">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToCart(e);
                                        }}
                                        className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-900 transition"
                                    >
                                        Add to Cart
                                    </button>

                                    <button
                                        type="button"
                                        className="w-full border border-black py-3 rounded-full hover:bg-black hover:text-white transition"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            ) : (
                                <button
                                    disabled
                                    className="w-full bg-white text-red-600 border border-red-600 py-3 rounded-full cursor-not-allowed"
                                >
                                    Out Of Stock
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDisplay;