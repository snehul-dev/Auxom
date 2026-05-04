import React from "react";
import { useNavigate } from "react-router-dom";

function Notfound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 px-4">
      
      <h1 className="text-7xl font-extrabold text-gray-800 mb-4">
        404
      </h1>

      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-500 mb-6 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition duration-300"
      >
        Go Back Home
      </button>

      <div className="mt-10 text-gray-400 text-sm">
        Error Code: 404
      </div>
    </div>
  );
}

export default Notfound;