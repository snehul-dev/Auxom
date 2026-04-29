import { useEffect, useState } from "react";
import img1 from "../assets/heroimg_1.png";
import img2 from "../assets/heroimg_2.png"; 
import img3 from "../assets/heroImg_3.jpeg"; 
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

const slides = [
  {
    image: img1,
    title: "Find The Best Fashion Style For You",
    desc: "Discover premium menswear designed for modern style.",
    align: "left"
  },
  {
    image: img2,
    title: "UP TO 50% OFF",
    desc: "Full flex at half price — OUT NOW!",
    align: "center"
  },
    {
    image:img3,
    title: "Minimal. Modern. AUXOM.",
    desc: "Redefining everyday menswear",
  },
];

function Hero() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0);

 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden" id="landing" >

    
      <img
        src={slides[current].image}
        className="w-full h-full object-cover transition duration-700"
      />
      <div className="absolute inset-0 bg-black/30"></div>
   
      <div
        className={`absolute inset-0 flex items-center px-16 ${
          slides[current].align === "center"
            ? "justify-center text-center"
            : slides[current].align === "right"
            ? "justify-end text-right"
            : "justify-start text-left"
        }`}
      >
        <div className="max-w-xl text-white">
          <h1 className="text-5xl font-semibold leading-tight mb-4">
            {slides[current].title}
          </h1>

          <p className="mb-6 text-gray-200">
            {slides[current].desc}
          </p>

          <button onClick={()=>{
             navigate("/products")
          }} className="bg-white text-black px-6 py-3">
            SHOP NOW
          </button>
        </div>
      </div>

    
      <div className="absolute bottom-6 w-full flex justify-center gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              current === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;