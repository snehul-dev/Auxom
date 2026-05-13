import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userFromStorage || null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {

      const existingUser = JSON.parse(localStorage.getItem("user"));

      localStorage.setItem("profileImage",existingUser?.profileImage || "");

      // REMOVE USER
      localStorage.removeItem("user");

      state.user = null;
    },
    updateUser: (state, action) => {

      state.user = action.payload;
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;