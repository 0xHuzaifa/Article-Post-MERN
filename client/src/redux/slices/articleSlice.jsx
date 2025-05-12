import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/axios/api";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  isError: false,
  articles: [],
  publishArticles: [],
  draftArticles: [],
  userArticles: [],
  userDraftArticles: [],
};

const getAllArticles = createAsyncThunk(
  "/articles/all-articles",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/article/all-articles");
      return res.data.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.message ||
          "Error while getting all articles"
      );
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.response.message ||
          "Error while getting all articles"
      );
    }
  }
);

const articleSlice = createSlice({
  name: "articles",
  initialState,

  reducers: {
    filterUserArticles: (state, { payload }) => {
      state.userArticles = state.publishArticles.filter(
        (article) => article.author._id === payload
      );
      state.userDraftArticles = state.userArticles.filter(
        (article) => article.isPublished === false
      );
    },
  },

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
        state.publishArticles = state.articles.filter(
          (article) => article.isPublished === true
        );
      })
      .addCase(getAllArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default articleSlice.reducer;
export { getAllArticles };
