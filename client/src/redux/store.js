import { configureStore } from "@reduxjs/toolkit";
import articleSlice from "./slices/articleSlice";
import authSlice from "./slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    articles: articleSlice,
  },
});

export default store;
