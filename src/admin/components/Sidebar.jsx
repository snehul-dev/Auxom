import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

function Sidebar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (

        <div className="w-64 min-h-screen bg-white text-black p-6 shadow-xl">

            <h1 className="text-3xl font-bold mb-10">
                AUXOM
            </h1>

            <div className="flex flex-col gap-4">

                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                        `px-4 py-3 rounded-xl transition duration-300 shadow-sm hover:shadow-md ${
                            isActive
                                ? "bg-black text-white shadow-lg"
                                : "bg-white text-black hover:bg-black hover:text-white"
                        }`
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin/products"
                    className={({ isActive }) =>
                        `px-4 py-3 rounded-xl transition duration-300 shadow-sm hover:shadow-md ${
                            isActive
                                ? "bg-black text-white shadow-lg"
                                : "bg-white text-black hover:bg-black hover:text-white"
                        }`
                    }
                >
                    Products
                </NavLink>

                <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                        `px-4 py-3 rounded-xl transition duration-300 shadow-sm hover:shadow-md ${
                            isActive
                                ? "bg-black text-white shadow-lg"
                                : "bg-white text-black hover:bg-black hover:text-white"
                        }`
                    }
                >
                    Users
                </NavLink>

                <NavLink
                    to="/admin/orders"
                    className={({ isActive }) =>
                        `px-4 py-3 rounded-xl transition duration-300 shadow-sm hover:shadow-md ${
                            isActive
                                ? "bg-black text-white shadow-lg"
                                : "bg-white text-black hover:bg-black hover:text-white"
                        }`
                    }
                >
                    Orders
                </NavLink>

                {/* <NavLink
                    to="/admin/profile"
                    className={({ isActive }) =>
                        `px-4 py-3 rounded-xl transition duration-300 shadow-sm hover:shadow-md ${
                            isActive
                                ? "bg-black text-white shadow-lg"
                                : "bg-white text-black hover:bg-black hover:text-white"
                        }`
                    }
                >
                    Profile
                </NavLink> */}

                <button
                    onClick={handleLogout}
                    className="mt-10 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl shadow-md hover:shadow-lg transition duration-300"
                >
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Sidebar;