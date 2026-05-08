  import { createSlice } from "@reduxjs/toolkit";

  const cartSlice = createSlice({
    name: "cart",
    initialState: {
      items: [],
    },
    reducers: {
      setCart: (state, action) => {
        state.items = action.payload;
      },
      addToCart: (state, action) => {
        const item = action.payload;

        const existing = state.items.find(
          (i) => i.productId === item.productId
        );

        if (existing) {
          existing.qty += item.qty || 1;
        } else {
           state.items.push(item);
        }
      },

      removeFromCart: (state, action) => {
        state.items = state.items.filter(
          (i) => i.id !== action.payload
        );     
      },
      increaseQty: (state, action) => {
        const item = state.items.find(
          (i) => i.id === action.payload
        );
        if (item) {
          item.qty += 1;
        }
      },

      decreaseQty: (state, action) => {
        const item = state.items.find(
          (i) => i.id === action.payload
        );

        if (item && item.qty > 1) {
          item.qty -= 1;
        } else {
          state.items = state.items.filter(
            (i) => i.id !== action.payload
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