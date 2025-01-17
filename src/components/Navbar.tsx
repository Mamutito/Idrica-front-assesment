import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  return (
    <nav>
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:text-blue-200">
            {t("nav.home")}
          </Link>
        </li>
        {isAuthenticated && (
          <>
            <li>
              <Link to="/create" className="hover:text-blue-200">
                {t("nav.createPost")}
              </Link>
            </li>
            <li>
              <Link to="/stats" className="hover:text-blue-200">
                {t("nav.stats")}
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
