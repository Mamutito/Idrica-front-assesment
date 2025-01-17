import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import StatsPage from "./pages/StatsPage";
import "./i18n";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
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
                </Route>
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
