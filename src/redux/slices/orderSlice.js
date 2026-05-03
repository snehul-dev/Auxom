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

const genericOrders = JSON.parse(localStorage.getItem("orders")) || [];
const ordersFromStorage =
  JSON.parse(localStorage.getItem(storageKey("orders"))) || genericOrders || [];
const saveOrdersToStorage = (orders) => {
  localStorage.setItem(storageKey("orders"), JSON.stringify(orders));
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

export const { addOrder, setOrders, clearOrders, resetOrders } = orderSlice.actions;
export default orderSlice.reducer;