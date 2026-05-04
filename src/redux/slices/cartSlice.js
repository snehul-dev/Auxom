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

const cartFromStorage = (() => {
  const key = storageKey("cart");
  if (!key) return [];
  return JSON.parse(localStorage.getItem(key)) || [];
})();
  const saveCartToStorage = (items) => {
    localStorage.setItem(storageKey("cart"), JSON.stringify(items));
  };

  const cartSlice = createSlice({
    name: "cart",
    initialState: {
      items: cartFromStorage,
    },
    reducers: {
      setCart: (state, action) => {
        state.items = action.payload;
        saveCartToStorage(state.items);
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
            inStock:item.inStock,
            name: item.name,
            price: item.price,
            image: item.image,
            qty: 1,
          });
        }
        saveCartToStorage(state.items);
      },

      removeFromCart: (state, action) => {
        state.items = state.items.filter(
          (i) => i.productId !== action.payload
        );
        saveCartToStorage(state.items);
      },
      increaseQty: (state, action) => {
        const item = state.items.find(
          (i) => i.productId === action.payload
        );
        if (item) {
          item.qty += 1;
          saveCartToStorage(state.items);
        }
      },

      decreaseQty: (state, action) => {
        const item = state.items.find(
          (i) => i.productId === action.payload
        );

        if (item && item.qty > 1) {
          item.qty -= 1;
        } else {
          state.items = state.items.filter(
            (i) => i.productId !== action.payload
          );
        }
        saveCartToStorage(state.items);
      },
      clearCart: (state) => {
        state.items = [];
        saveCartToStorage(state.items);
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