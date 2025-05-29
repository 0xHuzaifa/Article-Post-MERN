import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/axios/api";
import { toast } from "react-toastify";
import { clearUserArticles } from "./articleSlice";

const initialState = {
  isLoading: false,
  authMeLoading: true,
  isError: null,
  isLogin: false,
  isAdmin: false,
  user: null,
};

const login = createAsyncThunk(
  "/auth/login",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", data);
      dispatch(clearUserArticles());
      toast.success(res?.data?.message || res?.message || "Login Successful");
      return res.data.data;
    } catch (error) {
      console.log("login error", error.response);
      const message =
        error?.response?.data?.message ||
        error?.response?.message ||
        "Error while login";
      toast.error(message);
      return rejectWithValue(message);
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
        res?.data?.message || res?.message || "Registration Successful"
      );
      return res.data.data;
    } catch (error) {
      console.log("register error", error.response);
      const message =
        error?.response?.data?.message ||
        error?.response?.message ||
        "Error while registration";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const logout = createAsyncThunk(
  "/auth/logout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.get("/auth/logout");
      dispatch(clearUserArticles());
      console.log("logout res", res.data);
      toast.success(res?.data?.message || res?.message || "Logout Successful");
      return;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.message ||
        "Error while logout";
      console.log("logout res error", error);
      return rejectWithValue(message);
    }
  }
);

const authMe = createAsyncThunk(
  "/auth/auth-me",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/auth-me");
      console.log("auth me", res.data);
      return res.data.data;
    } catch (error) {
      console.log("auth me error", error.response);
      const message =
        error?.response?.data?.message ||
        error?.response?.message ||
        "Error while getting all articles";
      return rejectWithValue(message);
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
    clearAuthState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.user = [];
      state.isLogin = false;
      state.isAdmin = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
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
      })

      // logout case
      .addCase(logout.pending, (state) => {
        state.authMeLoading = true;
        state.isError = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authMeLoading = false;
        state.isError = false;
        state.user = [];
        state.isLogin = false;
        state.isAdmin = false;
      })
      .addCase(logout.rejected, (state) => {
        state.authMeLoading = false;
        state.isError = false;
        state.user = [];
        state.isLogin = false;
        state.isAdmin = false;
      })

      // auth me case
      .addCase(authMe.pending, (state) => {
        state.authMeLoading = true;
        state.isError = false;
      })
      .addCase(authMe.fulfilled, (state, action) => {
        state.authMeLoading = false;
        state.isError = false;
        state.user = action.payload;
        state.isLogin = true;
        state.isAdmin = state.user.role === "admin" ? true : false;
      })
      .addCase(authMe.rejected, (state) => {
        state.authMeLoading = false;
        state.isError = false;
        state.user = [];
        state.isLogin = false;
        state.isAdmin = false;
      });
  },
});

export default authSlice.reducer;
export { login, register, logout, authMe };
export const { clearAuthState, setLoading, checkUserRole } = authSlice.actions;
