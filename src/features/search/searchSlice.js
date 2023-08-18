import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/apiURL";

const initialState = {
  searchQuery: [],
  searchStat: "idle",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchBySearch.pending, (state) => {
        state.searchStat = "loading";
      })
      .addCase(fetchBySearch.fulfilled, (state, action) => {
        state.searchQuery = action.payload;
        state.searchStat = "idle";
      }),
});

export const fetchBySearch = createAsyncThunk(
  "search/fetchProducts",
  async (query) => {
    const res = await fetch(`${BASE_URL}products/search?q=${query}`);
    const data = await res.json();
    return data.products;
  },
);

export const getSearchedItems = (state) => state.search.searchQuery;
export const getSearchedItemsStats = (state) => state.search.searchStat;
export default searchSlice.reducer;
