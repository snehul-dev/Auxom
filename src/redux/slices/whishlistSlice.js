import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // 🔁 Toggle (Add / Remove)
    toggleWishlist: (state, action) => {
      const item = action.payload;

      const exists = state.items.find(
        (i) => i.id === item.id
      );

      if (exists) {
        // remove
        state.items = state.items.filter(
          (i) => i.id !== item.id
        );
      } else {
        // add
        state.items.push(item);
      }
    },

    // ➕ Add explicitly
    addToWishlist: (state, action) => {
      const item = action.payload;

      const exists = state.items.find(
        (i) => i.id === item.id
      );

      if (!exists) {
        state.items.push(item);
      }
    },

    // ❌ Remove explicitly
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    // 🧹 Clear all
    clearWishlist: (state) => {
      state.items = [];
    },

    // 🔄 Set (useful for login / backend sync)
    setWishlist: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const {
  toggleWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  setWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;