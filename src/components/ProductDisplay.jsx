import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { getProducts } from "../services/productService"
import { useState } from 'react'
import Navbar from './Navbar'

function ProductDisplay() {
    const [selectedSize, setSelectedSize] = useState(null)
    const [liked, setLiked] = useState(false)
    const { id } = useParams()
    const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts
    }
    )
    const product = data?.find(item => String(item.id) === id)
    if (isLoading) return <h1>Loading...</h1>
    if (isError) return <h1>Error loading product</h1>;
    if (!product) return <h1>Product Not Found</h1>
    return (
        <>
            <Navbar />

            <div className="h-screen grid md:grid-cols-2">

                <div className="h-full">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover 
                         transition-all duration-500 transform hover:scale-110 hover:-translate-y-3 hover:rotate-x-6 hover:rotate-y-3"
                    />
                </div>

                <div className="h-full flex items-center  justify-center bg-white px-6  md:px-10  overflow-y-auto relative ">
                    <button
                        onClick={() => setLiked(!liked)}
                        className="absolute top-5 right-5 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-md hover:scale-110 active:scale-90 transition-all duration-300"
                    >
                        <span
                            className={`text-xl inline-block transition-all duration-300 ${liked
                                    ? "text-red-500 scale-110"
                                    : "text-gray-400 scale-95"
                                }`}
                        >
                            {liked ? "❤️" : "🤍"}
                        </span>
                    </button>
                    <div className="w-full max-w-md flex flex-col gap-2 mb-10">


                        <h2 className="text-3xl font-semibold text-gray-900">
                            {product.name}
                        </h2>

                        <p className="text-2xl font-bold text-black">
                            ₹{product.price}
                        </p>
                        {product.InStock?
                        <p className='text-green-600 font-medium'>In Stock</p>:
                        <p className='text-red-600 font-medium'>Out Of Stock</p>
                        }

                        <div className="text-yellow-500 text-lg">
                            {"★".repeat(Math.floor(product.rating || 4))}
                            {"☆".repeat(5 - Math.floor(product.rating || 4))}
                        </div>

                        <p className="text-sm text-gray-600">
                            {product.color}
                        </p>
 
                        { <ul className="list-disc pl-5">
                            {product.description.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul> }  
                       

                        <div>
                            <p className="font-medium mb-3">Select Size</p>

                            <div className="flex gap-3 flex-wrap">
                                {["S", "M", "L", "XL", "XXL"].map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 border rounded-full text-sm transition
                  ${selectedSize === size
                                                ? "bg-black text-white border-black"
                                                : "hover:bg-black hover:text-white"
                                            }
                `}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 mt-4">
                            {product.InStock == true &&
                            <div className='flex gap-5'>
                            
                            <button className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-900 active:scale-95 transition">
                                Add to Cart
                            </button>

                            <button className="w-full border border-black py-3 rounded-full hover:bg-black hover:text-white active:scale-95 transition">
                                Buy Now
                            </button>
                            </div>}



                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDisplay