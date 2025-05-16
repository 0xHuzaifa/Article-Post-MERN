import { configureStore } from "@reduxjs/toolkit";
import articleSlice from "./slices/articleSlice";
import authSlice from "./slices/authSlice";
import categorySlice from "./slices/categorySlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    articles: articleSlice,
    category: categorySlice,
  },
});

export default store;
