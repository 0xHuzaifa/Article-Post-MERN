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
      const message =
        error?.response?.data?.message ||
        error?.response?.message ||
        "Error while getting all articles";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const getMyArticles = createAsyncThunk(
  "/articles/my-articles",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/article/my-articles");
      console.log("my artciles", res);
      return res.data.data;
    } catch (error) {
      console.log("my artciles error", error.response);
      const message =
        error?.response?.data?.message ||
        error?.response?.message ||
        "Error while getting all articles";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const getPublishArticles = createAsyncThunk(
  "/articles/published-articles",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/article/published-articles");
      console.log("publish articles", res);
      return res.data.data;
    } catch (error) {
      console.log("my artciles error", error.response);
      const message =
        error?.response?.data?.message ||
        error?.response?.message ||
        "Error while getting all articles";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const createArticle = createAsyncThunk(
  "/articles/create-article",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/article/create-article", formData);
      console.log("create artciles", res);
      toast.success("Article Created Successfully")
      return res.data.data;
    } catch (error) {
      console.log("create articles error", error);
      const message =
        error?.response?.data?.message ||
        error?.response?.message ||
        "Error while creating articles";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const getSpecificArticle = createAsyncThunk(
  "/articles/specific-article",
  async (slug, { rejectWithValue }) => {
    try {
      const res = await api.get(`/article/specific-article/${slug}`);
      console.log("get article", res);
      return res.data.data;
    } catch (error) {
      console.log("get article error", error.response);
      const message =
        error?.response?.data?.message ||
        error?.response?.message ||
        "Error while getting all articles";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const updateArticle = createAsyncThunk(
  "/articles//update-article/:id",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put(`/article/update-article/${data.id}`, data);
      console.log("update article", res);
      toast.success("Article Updated Successfully")
      return res.data.data;
    } catch (error) {
      console.log("update article error", error);
      const message =
        error?.response?.data?.message ||
        error?.response?.message ||
        "Error while updating article";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const deleteArticle = createAsyncThunk(
  "/articles//delete-article/:id",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/article/delete-article/${id}`);
      console.log("delete article", res);
      return id;
    } catch (error) {
      console.log("delete article error", error.response);
      const message =
        error?.response?.data?.message ||
        error?.response?.message ||
        "Error while deleting article";
      toast.error(message);
      return rejectWithValue(message);
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
    clearUserArticles: (state) => {
      state.userArticles = [];
      state.userDraftArticles = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllArticles.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllArticles.fulfilled, (state, action) => {
        state.isError = false;
        state.articles = action.payload;
        state.publishArticles = state.articles.filter(
          (article) => article.isPublished === true
        );
        state.isLoading = false;
      })
      .addCase(getAllArticles.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // get current users all articles
      .addCase(getMyArticles.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getMyArticles.fulfilled, (state, action) => {
        state.isError = false;
        const articles = action.payload || [];
        state.userArticles = articles.filter(
          (article) => article.isPublished === true
        );
        state.userDraftArticles = articles.filter(
          (article) => article.isPublished === false
        );
        state.isLoading = false;
      })
      .addCase(getMyArticles.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // get current users all articles
      .addCase(getPublishArticles.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getPublishArticles.fulfilled, (state, action) => {
        state.isError = false;
        state.publishArticles = action.payload || [];
        state.isLoading = false;
      })
      .addCase(getPublishArticles.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // create articles
      .addCase(createArticle.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.isError = false;
        const isPublish = action.payload.isPublished;
        if (isPublish) {
          state.publishArticles.unshift(action.payload);
          state.userArticles.unshift(action.payload);
        } else {
          state.userDraftArticles.unshift(action.payload);
        }
        state.isLoading = false;
      })
      .addCase(createArticle.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // get specific articles
      .addCase(getSpecificArticle.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getSpecificArticle.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getSpecificArticle.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // update specific articles
      .addCase(updateArticle.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const updateArticle = action.payload;
        state.publishArticles = state.publishArticles.filter((article) =>
          article._id === updateArticle._id ? updateArticle : article
        );
        state.userArticles = state.userArticles.filter((article) =>
          article._id === updateArticle._id ? updateArticle : article
        );
        state.userDraftArticles = state.userArticles.filter((article) =>
          article._id === updateArticle._id ? updateArticle : article
        );
      })
      .addCase(updateArticle.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // delete specific articles
      .addCase(deleteArticle.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const deleteArticle = action.payload;
        state.publishArticles = state.publishArticles.filter(
          (article) => article._id !== deleteArticle
        );
        state.userArticles = state.userArticles.filter(
          (article) => article._id !== deleteArticle
        );
        state.userDraftArticles = state.userArticles.filter(
          (article) => article._id !== deleteArticle
        );
      })
      .addCase(deleteArticle.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default articleSlice.reducer;
export const { clearUserArticles } = articleSlice.actions;
export {
  getAllArticles,
  getMyArticles,
  getPublishArticles,
  createArticle,
  getSpecificArticle,
  updateArticle,
  deleteArticle,
};
