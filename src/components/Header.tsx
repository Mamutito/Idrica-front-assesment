import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import Navbar from "./Navbar";

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="bg-blue-600 dark:bg-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t("app.title")}</h1>
        <Navbar />
        <div className="flex items-center space-x-4">
          <button
            onClick={() => changeLanguage("en")}
            className="text-sm hover:text-blue-200"
          >
            EN
          </button>
          <button
            onClick={() => changeLanguage("es")}
            className="text-sm hover:text-blue-200"
          >
            ES
          </button>
          <button
            onClick={toggleTheme}
            className="text-sm hover:text-blue-200"
            aria-label={
              theme === "light" ? t("theme.toggleDark") : t("theme.toggleLight")
            }
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-sm hover:text-blue-200"
            >
              {t("nav.logout")}
            </button>
          ) : (
            <Link to="/login" className="text-sm hover:text-blue-200">
              {t("nav.login")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
