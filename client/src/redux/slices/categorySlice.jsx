import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios/api";
import { toast } from "react-toastify";

const initialState = {
  categories: [],
  isLoading: false,
  isError: false,
};

const getAllCategories = createAsyncThunk(
  "/category/get-categories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/category/get-categories");
      return response.data;
    } catch (error) {
      const message = toast.error(
        error?.response?.data?.message ||
          error?.response?.message ||
          "Error while getting all articles"
      );
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const createCategory = createAsyncThunk(
  "/category/create-category",
  async (data, { rejectWithValue }) => {
    try {
      console.log("create category aaaa");
      const response = await api.post("/category/create-category", data);
      console.log("create category", response);
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.message ||
        "Error while getting all articles";
      console.log(message);
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const updateCategory = createAsyncThunk(
  "/category/update-category",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.put("/category/update-category", data);
      return response;
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

const deleteCategory = createAsyncThunk(
  "/category/delete-category",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/category/delete-category/${id}`);
      return id;
    } catch (error) {
      console.log("ccc", error.response);
      const message =
        error?.response?.data?.message ||
        error?.response?.message ||
        "Error while getting all articles";

      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const specificCategory = createAsyncThunk(
  "/category/specific-category",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/category/specific-category");
      return response;
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

const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.categories = action.payload.data || [];
      })
      .addCase(getAllCategories.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // create category
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.categories.push(action.payload.data);
      })
      .addCase(createCategory.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // update category
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.categories = action.payload.data || [];
      })
      .addCase(updateCategory.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // delete category
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default categorySlice.reducer;
export {
  createCategory,
  updateCategory,
  deleteCategory,
  specificCategory,
  getAllCategories,
};
