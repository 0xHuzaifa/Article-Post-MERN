import { Routes, Route } from "react-router-dom";
// auth pages
import { Login } from "@/pages/auth/Login";
import { Signup } from "@/pages/auth/Signup";

// pages
import Home from "@/pages/Home";
import ArticleFeed from "@/pages/ArticleFeed";
import Dashboard from "@/pages/dashboard/Dashboard";
import MyArticles from "@/pages/dashboard/MyArticles";
import Category from "@/pages/dashboard/admin/Category";
import Articles from "./pages/dashboard/admin/Articles";
import NotFound from "./pages/NotFound";

// components
import ArticleForm from "@/components/articles/ArticleForm";
import Layout from "@/components/layout/Layout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ArticleDetail from "@/components/articles/ArticleDetail";
import CategoryForm from "@/components/categories/CategoryForm";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPublishArticles } from "@/redux/slices/articleSlice";
import { ToastContainer } from "react-toastify";
import {
  PublicRoute,
  PrivateRoute,
  GuestOnlyRoute,
} from "./auth/RoleProtection";
import { authMe } from "@/redux/slices/authSlice";
import LoadingScreen from "@/components/common/LoadingScreen";
import { Profile } from "@/pages/dashboard/Profile";

function App() {
  const { publishArticles } = useSelector((state) => state.article);
  const { authMeLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!publishArticles || publishArticles.length === 0) {
      dispatch(getPublishArticles());
    }
  }, [publishArticles, dispatch]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(authMe()).unwrap();
        console.log("Auth check complete - authenticated");
      } catch (error) {
        // Error is handled in the Redux slice, we don't need to do anything here
        console.log("Auth check complete - not authenticated", error);
        console.log("error", error);
      }
    };
    checkAuth();
  }, [dispatch]);

  if (authMeLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <ToastContainer position="bottom-right" />
      <Routes>
        {/* Guest only routes */}
        <Route element={<GuestOnlyRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Routes with layout - public routes */}
        <Route element={<Layout />}>
          <Route element={<PublicRoute />}>
            <Route index element={<Home />} />
            <Route path="/articles" element={<ArticleFeed />} /> // All articles
            <Route path="/articles/:article" element={<ArticleDetail />} />{" "}
            //Specific article
          </Route>
        </Route>

        {/* Private routes */}
        {/* For User and Admin */}
        <Route element={<DashboardLayout />}>
          <Route element={<PrivateRoute allowedRole="both" />}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Article routes */}
            <Route path="/dashboard/create-article" element={<ArticleForm />} />
            <Route
              path="/dashboard/update-article/:id"
              element={<ArticleForm />}
            />
            <Route path="/dashboard/my-articles" element={<MyArticles />} />

            <Route path="/dashboard/profile" element={<Profile />} />
          </Route>

          {/* Private Routes only for Admin */}
          <Route element={<PrivateRoute allowedRole="admin" />}>
            {/* All Publish Articles */}
            <Route path="/all-articles" element={<Articles />} />

            {/* Category routes */}
            <Route path="/dashboard/categories" element={<Category />} />
            <Route
              path="/dashboard/create-category"
              element={<CategoryForm />}
            />
            <Route
              path="/dashboard/update-category/:id"
              element={<CategoryForm />}
            />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
