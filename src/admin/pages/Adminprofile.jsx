import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

import AdminLayout from "../components/AdminLayout";
import { logout, updateUser } from "../../redux/slices/authSlice";

function AdminProfile() {

  const user = useSelector(
    (state) => state.auth.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] =
    useState(false);

  const [profileImage, setProfileImage] =
    useState(
      user?.profileImage ||
      "/images/default-profile.png"
    );

  const [tempImage, setTempImage] =
    useState(profileImage);

  // LOGOUT
  const handleLogout = () => {

    dispatch(logout());

    navigate("/login");
  };

  // IMAGE SELECT
const handleImageChange = (e) => {

  const file = e.target.files[0];

  if (file) {

    const reader = new FileReader();

    reader.onloadend = () => {

      setTempImage(reader.result);
    };

    reader.readAsDataURL(file);
  }
};

  // SAVE IMAGE
  const handleSave = () => {

    const updatedUser = {
      ...user,
      profileImage: tempImage,
    };

    // UPDATE LOCAL STATE
    setProfileImage(tempImage);

    // UPDATE LOCAL STORAGE
    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    // UPDATE REDUX STATE
    dispatch(updateUser(updatedUser));

    setIsEditing(false);

    alert("Profile Photo Updated");
  };

  // CANCEL EDIT
  const handleCancel = () => {

    setTempImage(profileImage);

    setIsEditing(false);
  };

  return (

    <AdminLayout>

      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        {/* PROFILE SECTION */}

        <div className="flex flex-col items-center">

          {/* IMAGE */}

          <div className="relative">

            {(
              isEditing
                ? tempImage
                : profileImage
            ) &&
              (
                isEditing
                  ? tempImage
                  : profileImage
              ) !== "/images/default-profile.png" ? (

              <img
                src={
                  isEditing
                    ? tempImage
                    : profileImage
                }
                alt="Admin"
                className="w-36 h-36 rounded-full object-cover border-4 border-gray-200"
              />

            ) : (

              <div className="w-36 h-36 rounded-full bg-black text-white flex items-center justify-center text-5xl font-bold border-4 border-gray-200">

                {user?.fullName?.charAt(0)}

              </div>

            )}

            {/* EDIT BUTTON */}

            {!isEditing && (

              <button
                onClick={() =>
                  setIsEditing(true)
                }
                className="absolute bottom-2 right-2 bg-black text-white text-sm px-3 py-1 rounded-full hover:bg-gray-800"
              >
                Edit
              </button>

            )}

            {/* HIDDEN INPUT */}

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />

          </div>

          {/* EDIT ACTIONS */}

          {isEditing && (

            <div className="flex gap-3 mt-4">

              <button
                onClick={() =>
                  fileInputRef.current.click()
                }
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                Choose Image
              </button>

              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Save
              </button>

              <button
                onClick={handleCancel}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>

            </div>

          )}

          {/* NAME */}

          <h2 className="text-3xl font-bold mt-6">
            {user?.fullName}
          </h2>

          {/* EMAIL */}

          <p className="text-gray-500 text-lg mt-2">
            {user?.email}
          </p>

        </div>

        {/* LOGOUT */}

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