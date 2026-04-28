import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { getProducts } from "../services/productService"

function ProductDisplay() {
    const { id } = useParams()
    const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts
    }
    )
    const product = data?.find(item => String(item.id) === id)
    if (isLoading) return <h1>Loading...</h1>
    if (!product) return <h1>Product Not Found</h1>
    return (
        <div className="min-h-screen grid md:grid-cols-2">

            {/* LEFT - IMAGE (FULL HEIGHT) */}
            <div className="relative overflow-hidden">

                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition duration-700 hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            <div className="flex items-center justify-center p-6 md:p-12 bg-white/30 backdrop-blur-xl">

                <div className="w-full max-w-md flex flex-col gap-6">

                    <h2 className="text-3xl font-semibold text-gray-900">
                        {product.name}
                    </h2>

                    <p className="text-2xl font-bold text-black">
                        ₹{product.price}
                    </p>


                    {/* RATING */}
                    <div className="text-yellow-500 text-lg">
                        {"★".repeat(Math.floor(product.rating || 4))}
                        {"☆".repeat(5 - Math.floor(product.rating || 4))}
                    </div>

                    {/* COLOR */}
                    <p className="text-sm text-gray-600">
                        {product.color}
                    </p>
                    <ul className="list-disc pl-5">
                        {product.description.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>

                    {/* SIZE */}
                    <div>
                        <p className="font-medium mb-3">Select Size</p>

                        <div className="flex gap-3 flex-wrap">
                            {["S", "M", "L", "XL", "XXL"].map(size => (
                                <button
                                    key={size}
                                    className="px-4 py-2 border rounded-full text-sm hover:bg-black hover:text-white transition"
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="flex flex-col gap-3 mt-4">

                        <button className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-900 active:scale-95 transition">
                            Add to Cart
                        </button>

                        <button className="w-full border border-black py-3 rounded-full hover:bg-black hover:text-white active:scale-95 transition">
                            Buy Now
                        </button>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default ProductDisplay