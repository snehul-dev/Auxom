import { createSlice } from "@reduxjs/toolkit";

const getUserFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

const storageKey = (key) => {
  const user = getUserFromStorage();
  return user?.id ? `${key}_${user.id}` : key;
};

const genericWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
const wishlistFromStorage =
  JSON.parse(localStorage.getItem(storageKey("wishlist"))) || genericWishlist || [];
const saveWishlistToStorage = (items) => {
  localStorage.setItem(storageKey("wishlist"), JSON.stringify(items));
};

const initialState = {
  items: wishlistFromStorage,
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
      saveWishlistToStorage(state.items);
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
      saveWishlistToStorage(state.items);
    },

    // 🧹 Clear all
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage(state.items);
    },
    resetWishlist: (state) => {
      state.items = [];
    },

    // 🔄 Set (useful for login / backend sync)
    setWishlist: (state, action) => {
      state.items = action.payload;
      saveWishlistToStorage(state.items);
    },
  },
});

export const {
  toggleWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  resetWishlist,
  setWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;