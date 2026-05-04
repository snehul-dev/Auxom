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
  return user?.id ? `${key}_${user.id}` : null;
};

const wishlistFromStorage = (() => {
  const key = storageKey("wishlist");
  if (!key) return []; 
  return JSON.parse(localStorage.getItem(key)) || [];
})();

const saveWishlistToStorage = (items) => {
  const key = storageKey("wishlist");
  if (key) {
    localStorage.setItem(key, JSON.stringify(items));
  }
};

const initialState = {
  items: wishlistFromStorage,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const item = action.payload;

      const exists = state.items.find((i) => i.id === item.id);

      if (exists) {
        state.items = state.items.filter((i) => i.id !== item.id);
      } else {
        state.items.push(item);
      }

      saveWishlistToStorage(state.items);
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
      saveWishlistToStorage(state.items);
    },

    resetWishlist: (state) => {
      state.items = [];
    },

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