import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";

import API from "../../services/api";

export const fetchProducts =createAsyncThunk(
    "products/fetchProducts",
    async () => {
      const res = await API.get("/products");
      return res.data;
    }
  );

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },

    addProduct: (state, action) => {
      state.items.push(action.payload);
    },

    updateProduct: (state,action) => {
      const index = state.items.findIndex((item) =>item.id ===action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;   
     }},

    deleteProduct: (state, action ) => {
      state.items = state.items.filter( (item) =>
            item.id !== action.payload );
    },

  },

  extraReducers: (builder) => {

    builder

      .addCase(
        fetchProducts.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        fetchProducts.fulfilled,
        (state, action) => {

          state.loading = false;

          state.items =
            action.payload;
        }
      )

      .addCase(
        fetchProducts.rejected,
        (state) => {

          state.loading = false;

          state.error =
            "Failed to load";
        }
      );
  },

});

export const {

  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,

} = productSlice.actions;

export default productSlice.reducer;