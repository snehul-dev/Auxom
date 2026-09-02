
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../components/AdminLayout";
import { logout } from "../../redux/slices/authSlice";

function AdminProfile() {

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AdminLayout>

      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <div className="flex flex-col items-center">

          {/* Admin Profile Circle */}
          <div className="w-36 h-36 rounded-full bg-black text-white flex items-center justify-center text-5xl font-bold border-4 border-gray-200">
            {user?.fullName?.charAt(0)?.toUpperCase()}
          </div>

          {/* Admin Name */}
          <h2 className="text-3xl font-bold mt-6">
            {user?.fullName}
          </h2>

          {/* Admin Email */}
          <p className="text-gray-500 text-lg mt-2">
            {user?.email}
          </p>

        </div>

        {/* Logout */}
        <div className="flex justify-center mt-8">

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>

      </div>

    </AdminLayout>
  );
}

export default AdminProfile;

