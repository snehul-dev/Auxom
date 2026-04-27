import React from 'react'
import tshirtImg from "../assets/category_tshirt.jpeg"
import shirtImg from "../assets/category_shirt.png"
import pantImg from "../assets/category_pant.jpeg"

const categories = [
  {
    id: 1,
    name: "T-Shirts",
    image: tshirtImg
  },
  {
    id: 2,
    name: "Shirts",
    image: shirtImg
  },
  {
    id: 1,
    name: "Pants",
    image: pantImg
  }
]

function Categories() {
  return (
    <div className="px-10 py-16">

      
      <h1 className="text-center text-4xl md:text-5xl font-semibold tracking-wide mb-12">
        Shop the Drop
      </h1>

   
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((item, index) => (
          <div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-lg"
          >
          
            <img
              src={item.image}
              className="w-full h-[400px] object-cover transform group-hover:scale-105 transition duration-500"
            />

            
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition"></div>

          
            <h2 className="absolute bottom-4 left-4 text-white text-xl font-medium">
              {item.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;