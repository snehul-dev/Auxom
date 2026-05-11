import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/")
    };

    return (
        <div className="w-64 min-h-screen bg-black text-white p-6">

            <h1 className="text-3xl font-bold mb-10">
                AUXOM
            </h1>

            <div className="flex flex-col gap-4">

                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                        `px-4 py-3 rounded-lg transition ${isActive
                            ? "bg-white text-black"
                            : "hover:bg-gray-800"
                        }`}
                >
                    Dashboard
                </NavLink>

                <NavLink to="/admin/products"
                    className={({ isActive }) =>
                        `px-4 py-3 rounded-lg transition ${isActive
                            ? "bg-white text-black"
                            : "hover:bg-gray-800"
                        }`}> Products </NavLink>

                <NavLink to="/admin/users"
                    className={({ isActive }) =>
                        `px-4 py-3 rounded-lg transition ${isActive
                            ? "bg-white text-black"
                            : "hover:bg-gray-800"}`} >Users</NavLink>

                <NavLink to="/admin/orders"
                    className={({ isActive }) =>
                        `px-4 py-3 rounded-lg transition ${isActive
                            ? "bg-white text-black"
                            : "hover:bg-gray-800"
                        }`} > Orders</NavLink>

                <NavLink
                    to="/admin/profile"
                    className={({ isActive }) =>
                        `px-4 py-3 rounded-lg transition ${isActive
                            ? "bg-white text-black"
                            : "hover:bg-gray-800"}`}>Profile</NavLink>

                <button
                    onClick={handleLogout}
                    className="mt-10 bg-red-500 hover:bg-red-600 px-4 py-3 rounded-lg transition"
                >
                    Logout
                </button>

            </div>
        </div>
    );
}

export default Sidebar;