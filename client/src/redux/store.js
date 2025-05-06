import { configureStore } from "@reduxjs/toolkit";
import articleSlice from "./slices/articleSlice";

const store = configureStore({
  reducer: {
    articles: articleSlice,
  },
});

export default store;
