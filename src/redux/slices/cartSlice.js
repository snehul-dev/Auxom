import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
    grandTotal : 0,
  },

  reducers: {
    setCart: (state, action) => {
      state.items = action.payload?.items || [];
      state.grandTotal = action.payload?.grandTotal ||0;
    },

    addToCart: (state, action) => {
      const item = action.payload;

      const existing = state.items.find(
        (i) => i.productId === item.productId
      );

      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        state.items.push(item);
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (i) => i.cartItemId !== action.payload
      );
    },

    increaseQty: (state, action) => {
      const item = state.items.find(
        (i) => i.cartItemId === action.payload
      );

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQty: (state, action) => {
      const item = state.items.find(
        (i) => i.cartItemId === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (i) => i.cartItemId !== action.payload
        );
      }
    },

    clearCart: (state) => {
      state.items = [];
    },

    resetCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  setCart,
  clearCart,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;