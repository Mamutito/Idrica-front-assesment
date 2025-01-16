import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header>
      <h1>Mi Aplicación de Posts</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link to="/create">Crear Post</Link>
            </li>
          )}
          {!isAuthenticated ? (
            <li>
              <Link to="/login">Iniciar Sesión</Link>
            </li>
          ) : (
            <li>
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
