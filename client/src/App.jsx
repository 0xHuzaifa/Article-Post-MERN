import { Routes, Route } from "react-router-dom";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Home from "@/pages/Home";
import Header from "@/components/common/Header";
import CreateArticle from "@/components/dashboard/user/createArticle";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard/create-article" element={<CreateArticle />} />
      </Routes>
    </div>
  );
}

export default App;
