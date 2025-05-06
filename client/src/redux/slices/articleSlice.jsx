import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/axios/api";

const initialState = {
  isLoading: false,
  isError: false,
  articles: [],
};

const getAllArticles = createAsyncThunk(
  "/articles/all-articles",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/articles/all-articles");
      console.log(res);
      return res;
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
