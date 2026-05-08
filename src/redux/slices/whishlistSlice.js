import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState: {
    items: [],
  },

  reducers: {
    setWishlist: (state, action) => {
      state.items = action.payload;
    },

    toggleWishlist: (state, action) => {
      const item = action.payload;

      const exists = state.items.find(
        (i) => i.productId === item.productId
      );

      if (exists) {
        state.items = state.items.filter(
          (i) => i.productId !== item.productId
        );
      } else {
        state.items.push(item);
      }
    },

    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(
        (i) => i.id !== action.payload
      );
    },

    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const {
  setWishlist,
  toggleWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;