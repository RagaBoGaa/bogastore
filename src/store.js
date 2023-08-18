import { configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "./features/sidebar/sideBarSlice";
import productsReducer from "./features/products/productsSlice";
import categoryReducer from "./features/category/categorySlice";
import cartReducer from "./features/cart/cartSlice";
import searchReducer from "./features/search/searchSlice";

const store = configureStore({
  reducer: {
    sidebar: sideBarReducer,
    products: productsReducer,
    category: categoryReducer,
    cart: cartReducer,
    search: searchReducer,
  },
});

export default store;
