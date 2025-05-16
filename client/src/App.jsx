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

// components
import ArticleForm from "@/components/articles/ArticleForm";
import Layout from "@/components/layout/layout";
import ArticleDetail from "@/components/articles/ArticleDetail";
import CategoryForm from "./components/categories/CategoryForm";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllArticles } from "@/redux/slices/articleSlice";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllArticles());
  }, []);

  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Public routes without layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Routes with layout - public routes */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/articles" element={<ArticleFeed />} /> // All articles
          <Route path="/articles/:article" element={<ArticleDetail />} /> //
          Specific article
        </Route>

        {/* Private routes */}
        <Route element={<Authentication />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Article routes */}
          <Route path="/dashboard/create-article" element={<ArticleForm />} />
          <Route
            path="/dashboard/update-article/:id"
            element={<ArticleForm />}
          />
          <Route path="/dashboard/my-articles" element={<MyArticles />} />
          <Route path="/dashboard/draft-articles" element={<CreateArticle />} />

          {/* Category routes */}
          <Route path="/dashboard/categories" element={<Category />} />
          <Route path="/dashboard/create-category" element={<CategoryForm />} />
          <Route
            path="/dashboard/update-category/:id"
            element={<CreateArticle />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
