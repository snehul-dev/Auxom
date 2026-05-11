import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { logout } from "../../redux/slices/authSlice";

function AdminProfile() {

  const user = useSelector(
    (state) => state.auth.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login");
  };

  return (
    <AdminLayout>

      <div className="max-w-xl bg-white p-8 rounded-2xl shadow">

        <h1 className="text-3xl font-bold mb-6">
          Admin Profile
        </h1>

        <div className="space-y-4">

          <div>
            <p className="text-gray-500">
              Name
            </p>

            <h2 className="text-xl font-semibold">
              {user?.fullName}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">
              Email
            </p>

            <h2 className="text-xl font-semibold">
              {user?.email}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">
              Role
            </p>

            <h2 className="text-xl font-semibold capitalize">
              {user?.role}
            </h2>
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>

        </div>

      </div>

    </AdminLayout>
  );
}

export default AdminProfile;