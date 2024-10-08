import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./module/post/PostDetailPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardLayout from "./module/dashboard/DashboardLayout";
import PostManage from "./module/post/PostManage";
import AddPost from "./module/post/AddPost";
import UserManage from "./module/user/UserManage";
import UserProfile from "./module/user/UserProfile";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import BlogPage from "./pages/BlogPage";
import AuthorPage from "./pages/AuthorPage";
import CategoryPage from "./pages/CategoryPage";
import UpdatePost from "./module/post/UpdatePost";
import RequireAdmin from "./components/RequireAuth/RequireAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/blog/:slug" element={<PostDetailPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/author/:slug" element={<AuthorPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="*" element={<NotFoundPage />} />

        <Route element={<DashboardLayout></DashboardLayout>}>
          {/* <Route path="/dashboard" element={<DashboardPage />} />
           */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            }
          />
          <Route
            path="/manage/post"
            element={
              <RequireAuth>
                <PostManage></PostManage>
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/manage/add-post"
            element={
              <RequireAuth>
                <AddPost></AddPost>
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/manage/user"
            element={
              <RequireAdmin>
                <UserManage></UserManage>
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="/manage/update-profile/:id"
            element={
              <RequireAuth>
                <UserProfile></UserProfile>
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/manage/update-post/:slug"
            element={
              <RequireAuth>
                <UpdatePost></UpdatePost>
              </RequireAuth>
            }
          ></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
