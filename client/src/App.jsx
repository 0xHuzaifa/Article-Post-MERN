import { Routes, Route } from "react-router-dom";
// auth pages
import { Login } from "@/pages/auth/Login";
import { Signup } from "@/pages/auth/Signup";

// pages
import Home from "@/pages/Home";
import ArticleFeed from "@/pages/ArticleFeed";
import Dashboard from "@/pages/dashboard/Dashboard";

// components
import CreateArticle from "@/components/dashboard/user/createArticle";
import Layout from "@/components/layout/layout";
import ArticleDetail from "@/components/common/ArticleDetail";
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

        {/* Routes with layout */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/articles" element={<ArticleFeed />} />
          <Route path="/articles/:article" element={<ArticleDetail />} />
          <Route path="/dashboard/create-article" element={<CreateArticle />} />
          <Route
            path="/dashboard/update-article/:id"
            element={<CreateArticle />}
          />
          <Route path="/dashboard/my-articles" element={<CreateArticle />} />
          <Route path="/dashboard/draft-articles" element={<CreateArticle />} />
          <Route path="/dashboard/categories" element={<CreateArticle />} />
          <Route
            path="/dashboard/create-category"
            element={<CreateArticle />}
          />
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
