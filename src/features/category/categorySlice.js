import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/apiURL";

const initialState = {
  categories: [],
  categoriesStatus: "idle",
  productsByCategory: [],
  productsByCategoryStatus: "idle",
};

const categoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesStatus = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.categoriesStatus = "idle";
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.productsByCategoryStatus = "loading";
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.productsByCategory = action.payload;
        state.productsByCategoryStatus = "idle";
      }),
});

export const fetchCategories = createAsyncThunk("category/fetch", async () => {
  const res = await fetch(`${BASE_URL}products/categories`);
  const data = await res.json();
  return data;
});

export const fetchProductsByCategory = createAsyncThunk(
  "productcategory/fetch",
  async (category) => {
    const res = await fetch(`${BASE_URL}products/category/${category}`);
    const data = await res.json();
    return data.products;
  },
);

export const getAllCategories = (state) => state.category.categories;
export const getAllCategoriesStatus = (state) =>
  state.category.categoriesStatus;

export const getAllProductsByCategory = (state) =>
  state.category.productsByCategory;
export const getAllProductsByCategoryStatus = (state) =>
  state.category.productsByCategoryStatus;

export default categoriesSlice.reducer;
