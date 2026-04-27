import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center px-10 py-5 bg-black text-white">
      <h1 className="text-xl font-bold tracking-widest">AUXOM</h1>

      <div className="flex gap-8 text-sm">
        <p className="cursor-pointer hover:text-gray-400">MEN</p>
        <p className="cursor-pointer hover:text-gray-400">COLLECTION</p>
        <p className="cursor-pointer hover:text-gray-400">TRENDS</p>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/login")}
          className="border border-white px-4 py-1 hover:bg-white hover:text-black transition"
        >
          LOGIN
        </button>
      </div>
    </div>
  );
}

export default Navbar;