import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // [{ productId, name, price, image, qty }]
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existing = state.items.find(
        (i) => i.productId === item.productId
      );

      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...item, qty: 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },

    increaseQty: (state, action) => {
      const item = state.items.find(
        (i) => i.productId === action.payload
      );
      if (item) item.qty += 1;
    },

    decreaseQty: (state, action) => {
      const item = state.items.find(
        (i) => i.productId === action.payload
      );
      if (item && item.qty > 1) {
        item.qty -= 1;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
} = cartSlice.actions;

export default cartSlice.reducer;