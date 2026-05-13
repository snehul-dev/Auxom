import { useSelector } from "react-redux";
import AdminProfile from "../pages/Adminprofile"
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-3">
        <div
          onClick={() =>
            navigate("/admin/profile")
          }
          className="hover:cursor-pointer"
        >

          {user?.profileImage ? (

            <img
              src={user.profileImage}
              alt="Admin"
              className="w-10 h-10 rounded-full object-cover border"
            />

          ) : (

            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
              {user?.fullName?.charAt(0)}
            </div>

          )}

        </div>

        <div>
          <p className="font-semibold">
            {user?.fullName}
          </p>

          <p className="text-sm text-gray-500">
            {user?.email}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;