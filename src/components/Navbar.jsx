import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { resetCart } from "../redux/slices/cartSlice";
import { clearWishlist } from "../redux/slices/whishlistSlice";
import { clearOrders } from "../redux/slices/orderSlice";
import { getProducts } from "../services/productService";
import { useQuery } from "@tanstack/react-query";

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);
  const wishItems = useSelector((state) => state.wishlist.items)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState("")
  const [debounceSearch, setDebounceSearch] = useState("")
  const [open, setOpen] = useState(false);
  const [showUser, setShowUser] = useState(false);


  function handleLogout() {
    dispatch(logout());
    dispatch(resetCart());
    dispatch(clearWishlist());
    dispatch(clearOrders());
    navigate("/");
  }
  const { data = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts
  })
  const isActive = (path) => location.pathname === path;
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    if (location.pathname === "/products") {
      setSearch(searchQuery);
    }
  }, [location.pathname, searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search.toLowerCase())
    }, 400);
    return () => clearTimeout(timer)
  }, [search])
  useEffect(() => {
    if (debounceSearch.trim()) {
      navigate(`/products?search=${debounceSearch}`)
    }
  }, [debounceSearch, navigate])

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
          <p
            onClick={() => navigate("/")}
            className={`cursor-pointer ${isActive("/") ? "text-cyan-400" : "hover:text-gray-400"
              }`}
          >
            Home
          </p>

          <p
            onClick={() => navigate("/orders")}
            className={`cursor-pointer ${isActive("/orders") ? "text-cyan-400" : "hover:text-gray-400"
              }`}
          >
            ORDERS
          </p>

          <p
            onClick={() => navigate("/products")}
            className={`cursor-pointer ${isActive("/products") ? "text-cyan-400" : "hover:text-gray-400"
              }`}
          >
            COLLECTION
          </p>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 w-64 bg-gray-900 text-white placeholder-gray-400 border border-gray-700 rounded-full outline-none focus:border-white focus:ring-1 focus:ring-white transition"
          />
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            🛒
            {cartItems?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>

          <div
            onClick={() => navigate("/wishlist")}
            className={`relative cursor-pointer ${isActive("/wishlist")
              ? "text-cyan-400"
              : "hover:text-gray-400"
              }`}
          >
            Wishlist

            {wishItems?.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 rounded-full">
                {wishItems.length}
              </span>
            )}
          </div>

          {user ? (
            <div className="relative">
              <div
                onClick={() => setShowUser(!showUser)}
                className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-sm font-semibold cursor-pointer"
              >
                {user?.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt={user.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user?.fullName?.charAt(0).toUpperCase()
                )}
              </div>

              {showUser && (
                <div className="absolute top-12 right-0 bg-white text-black rounded-lg shadow-lg p-4 w-48 z-50">
                  <p className="font-semibold mb-2">
                    {user?.fullName}
                  </p>

                  <p
                    onClick={() => {
                      navigate("/orders");
                      setShowUser(false);
                    }}
                    className="cursor-pointer hover:text-gray-500 mb-2"
                  >
                    Orders
                  </p>

                  <p
                    onClick={() => {
                      navigate("/wishlist");
                      setShowUser(false);
                    }}
                    className="cursor-pointer hover:text-gray-500 mb-2"
                  >
                    Wishlist
                  </p>

                  <button
                    onClick={handleLogout}
                    className="text-sm border px-3 py-1 rounded hover:bg-black hover:text-white transition w-full"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="border px-4 py-1 rounded hover:bg-white hover:text-black transition hidden md:flex"
            >
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

      {open && (
        <div className="flex flex-col gap-4 mt-6 md:hidden text-sm">

          <p
            onClick={() => navigate("/products")}
            className="cursor-pointer hover:text-gray-400"
          >
            MEN
          </p>

          <p
            onClick={() => navigate("/products")}
            className="cursor-pointer hover:text-gray-400"
          >
            COLLECTION
          </p>

          <p
            onClick={() =>
              navigate("/orders")
            }
            className="cursor-pointer hover:text-gray-400"
          >
            ORDERS
          </p>

          {user ? (
            <div className="text-end">
              <button
                onClick={handleLogout}
                className="text-sm px-3 py-1 border border-white hover:bg-white hover:text-black transition"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <div className="flex justify-end">
              <button
                onClick={() => navigate("/login")}
                className="border border-white px-4 py-2 w-fit hover:bg-white hover:text-black transition"
              >
                LOGIN
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;