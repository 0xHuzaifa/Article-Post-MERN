import { Routes, Route } from "react-router-dom";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Home from "@/pages/Home";
import CreateArticle from "@/components/dashboard/user/createArticle";
import Layout from "@/components/layout/layout";
import ArticleFeed from "@/pages/ArticleFeed";
import ArticleDetail from "@/components/common/ArticleDetail";

function App() {
  return (
    <div>
      <Routes>
        {/* Public routes without layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Routes with layout */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/articles" element={<ArticleFeed />} />
          <Route path="/articles/:article" element={<ArticleDetail />} />
          <Route path="/dashboard/create-article" element={<CreateArticle />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
