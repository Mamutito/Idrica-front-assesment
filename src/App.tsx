import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import StatsPage from "./pages/StatsPage";
import "./i18n";
import { useAppSelector } from "./hooks/useAppSelector";
import PostComments from "./components/PostComments";

const App: React.FC = () => {
  const theme = useAppSelector((state) => state.ui.theme);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [theme]);
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PostList />} />
            <Route element={<PrivateRoute />}>
              <Route path="/create" element={<CreatePost />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/post/:postId/comments" element={<PostComments />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
