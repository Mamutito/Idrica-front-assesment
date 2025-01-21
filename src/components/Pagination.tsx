import type React from "react";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800"
      >
        {t("pagination.previous")}
      </button>
      <span className="text-gray-700 dark:text-gray-300">
        {t("pagination.page")} {currentPage} {t("pagination.of")} {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800"
      >
        {t("pagination.next")}
      </button>
    </div>
  );
};

export default Pagination;
