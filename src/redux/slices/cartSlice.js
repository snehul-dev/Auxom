  import { createSlice } from "@reduxjs/toolkit";

  const cartSlice = createSlice({
    name: "cart",
    initialState: {
      items: [],
    },
    reducers: {
      setCart: (state, action) => {
        state.items = action.payload
      },
      addToCart: (state, action) => {
        const item = action.payload;

        const existing = state.items.find(
          (i) => i.productId === item.id
        );

        if (existing) {
          existing.qty += 1;
        } else {
          state.items.push({
            productId: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            qty: 1,
          });
        }
      },

      removeFromCart: (state, action) => {
        state.items = state.items.filter(
          (i) => i.productId !== action.payload
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
        } else {
          // remove if qty becomes 0
          state.items = state.items.filter(
            (i) => i.productId !== action.payload
          );
        }
      },
      clearCart: (state) => {
        state.items = [];
      },
    },
  });

  export const { addToCart, removeFromCart, increaseQty, decreaseQty, setCart,clearCart } = cartSlice.actions;
  export default cartSlice.reducer;