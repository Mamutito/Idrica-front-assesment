import React from "react";
import { useTranslation } from "react-i18next";
import UserStatsChart from "../components/UserStatsChart";

const StatsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">
        {t("stats.title")}
      </h1>
      <UserStatsChart />
    </div>
  );
};

export default StatsPage;
