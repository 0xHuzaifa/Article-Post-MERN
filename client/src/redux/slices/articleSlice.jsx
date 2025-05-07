import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/axios/api";
import axios from "axios";
const initialState = {
  isLoading: false,
  isError: false,
  articles: [],
};

const getAllArticles = createAsyncThunk(
  "/articles/all-articles",
  async (_, { rejectWithValue }) => {
    try {
      console.log("running slice");
      const res = await api.get("/articles/all-articles");
      console.log(res.data);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const articleSlice = createSlice({
  name: "articles",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getAllArticles.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.articles = action.payload;
      })
      .addCase(getAllArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default articleSlice.reducer;
export { getAllArticles };
