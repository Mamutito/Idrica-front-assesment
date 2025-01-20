import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <nav className="w-full md:w-auto">
      <ul className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
        <li>
          <Link to="/" className="block hover:text-blue-200">
            {t("nav.home")}
          </Link>
        </li>
        {isAuthenticated && (
          <>
            <li>
              <Link to="/create" className="block hover:text-blue-200">
                {t("nav.createPost")}
              </Link>
            </li>
            <li>
              <Link to="/stats" className="block hover:text-blue-200">
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
