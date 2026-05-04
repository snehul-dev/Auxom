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

const ordersFromStorage = (() => {
  const key = storageKey("orders");
  if (!key) return []; 
  return JSON.parse(localStorage.getItem(key)) || [];
})();

const saveOrdersToStorage = (orders) => {
  const key = storageKey("orders");
  if (key) {
    localStorage.setItem(key, JSON.stringify(orders));
  }
};

const initialState = {
  orders: ordersFromStorage,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
      saveOrdersToStorage(state.orders);
    },

    setOrders: (state, action) => {
      state.orders = action.payload;
      saveOrdersToStorage(state.orders);
    },

    clearOrders: (state) => {
      state.orders = [];
      saveOrdersToStorage(state.orders);
    },

    resetOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { addOrder, setOrders, clearOrders, resetOrders } =
  orderSlice.actions;

export default orderSlice.reducer;