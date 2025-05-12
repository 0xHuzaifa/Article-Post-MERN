import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/axios/api";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  isError: null,
  isLogin: false,
  isAdmin: false,
  user: null,
};

const login = createAsyncThunk(
  "/auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", data);
      toast.success(
        res?.data?.message || res?.message || "Error while getting all articles"
      );
      return res.data.data;
    } catch (error) {
      console.log(error);
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

const register = createAsyncThunk(
  "/auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/register", data);
      console.log(res);
      toast.success(
        res?.data?.message || res?.message || "Error while getting all articles"
      );
      return res.data.data;
    } catch (error) {
      console.log(error);
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

const logout = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/logout");
      console.log("logout res", res.data);
      return res.data.data;
    } catch (error) {
      return rejectWithValue("unexpected error");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    checkUserRole: (state) => {
      state.isAdmin = state.user.role === "admin" ? true : false;
    },
  },

  extraReducers: (builder) => {
    builder
      // login case
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload;
        state.isLogin = true;
        state.isAdmin = state.user.role === "admin" ? true : false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // register case
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default authSlice.reducer;
export { login, register, logout };
