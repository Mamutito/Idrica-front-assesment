import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PostList />} />
            <Route element={<PrivateRoute />}>
              <Route path="/create" element={<CreatePost />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
