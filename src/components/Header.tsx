import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { logout } from "../store/slices/authSlice";
import { setLanguage, setTheme } from "../store/slices/uiSlice";

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { theme } = useAppSelector((state) => state.ui);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const changeLanguage = (lng: "en" | "es") => {
    dispatch(setLanguage(lng));
    i18n.changeLanguage(lng);
  };

  const toggleTheme = () => {
    dispatch(setTheme(theme === "light" ? "dark" : "light"));
  };

  return (
    <header className="bg-blue-600 dark:bg-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t("app.title")}</h1>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
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
                  theme === "light"
                    ? t("theme.toggleDark")
                    : t("theme.toggleLight")
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
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <Navbar />
            <div className="mt-2">
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
            <div className="flex space-x-2 mt-4">
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
                  theme === "light"
                    ? t("theme.toggleDark")
                    : t("theme.toggleLight")
                }
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
