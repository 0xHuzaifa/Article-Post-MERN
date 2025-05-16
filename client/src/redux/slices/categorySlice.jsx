import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  isLoading: false,
  isError: false,
};

const getAllCategories = createAsyncThunk(
  "/category/get-categories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/category/get-categories");
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const createCategory = createAsyncThunk(
  "/category/create-category",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/category/create-category");
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const updateCategory = createAsyncThunk(
  "/category/update-category",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/category/update-category");
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const deleteCategory = createAsyncThunk(
  "/category/delete-category",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/category/delete-category");
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
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
      return rejectWithValue(error.response.data.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: {},
});

export default categorySlice.reducer;
export {
  createCategory,
  updateCategory,
  deleteCategory,
  specificCategory,
  getAllCategories,
};
