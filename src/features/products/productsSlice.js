import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/apiURL";

const initialState = {
  products: [],
  status: "idle",
  singleProduct: [],
  singleProductStatus: "idle",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducer: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = "idle";
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.singleProductStatus = "loading";
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.singleProduct = action.payload;
        state.singleProductStatus = "idle";
      }),
});

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (limit) => {
    const res = await fetch(`${BASE_URL}products?limit=${limit}`);
    const data = await res.json();
    return data.products;
  },
);

// Fetch single product based on ID
export const fetchSingleProduct = createAsyncThunk(
  "singleproduct/fetch",
  async (id) => {
    const res = await fetch(`${BASE_URL}products/${id}`);
    const data = await res.json();
    return data;
  },
);

export const getAllProducts = (state) => state.products.products;
export const getProductsStatus = (state) => state.products.status;

export const getSingleProduct = (state) => state.products.singleProduct;
export const getSingleProductStatus = (state) =>
  state.products.singleProductStatus;

export default productsSlice.reducer;
