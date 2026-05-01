import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const totalCount =
    user?.cart?.reduce((acc, item) => acc + item.qty, 0) || 0;

  function handleLogout() {
    dispatch(logout());
    navigate("/");
  }

  return (
    <div className="bg-black text-white px-6 md:px-10 py-5 sticky top-0 z-50">
      <div className="flex justify-between items-center">

        <h1
          className="text-xl font-bold tracking-widest cursor-pointer"
          onClick={() => navigate("/")}
        >
          AUXOM
        </h1>

        <div className="hidden md:flex gap-8 text-sm">
          <p onClick={() => navigate("/")}>Home</p>
          <p onClick={() => navigate("/products")}>MEN</p>
          <p onClick={() => navigate("/products")}>COLLECTION</p>
        </div>

        <div className="flex items-center gap-4">

          {/* 🛒 CART */}
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer text-xl"
          >
            🛒
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 rounded-full">
                {totalCount}
              </span>
            )}
          </div>

          {/* USER */}
          {user ? (
            <>
              <span className="hidden md:block">
                Hi, {user.fullName}
              </span>

              <button
                onClick={handleLogout}
                className="border px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => navigate("/login")}>
              Login
            </button>
          )}

          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;