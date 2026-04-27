import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-black text-white px-6 md:px-10 py-5">
      
      <div className="flex justify-between items-center">       
        
        <h1 className="text-xl font-bold tracking-widest">
          AUXOM
        </h1>

        <div className="hidden md:flex gap-8 text-sm">
          <p className="cursor-pointer hover:text-gray-400">MEN</p>
          <p className="cursor-pointer hover:text-gray-400">COLLECTION</p>
          <p className="cursor-pointer hover:text-gray-400">TRENDS</p>
        </div>

       
        <div className="flex items-center gap-4">
          
        
          <button
            onClick={() => navigate("/login")}
            className="hidden md:block border border-white px-4 py-1 hover:bg-white hover:text-black transition"
          >
            LOGIN
          </button>

        
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>

     
      {open && (
        <div className="flex flex-col gap-4 mt-6 md:hidden text-sm">
          <p className="cursor-pointer hover:text-gray-400">MEN</p>
          <p className="cursor-pointer hover:text-gray-400">COLLECTION</p>
          <p className="cursor-pointer hover:text-gray-400">TRENDS</p>

          <button
            onClick={() => navigate("/login")}
            className="border border-white px-4 py-2 w-fit hover:bg-white hover:text-black transition"
          >
            LOGIN
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;