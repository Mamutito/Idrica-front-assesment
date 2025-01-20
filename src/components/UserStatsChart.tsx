import React from "react";
import { useTranslation } from "react-i18next";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  useGetUsersQuery,
  useGetPostsQuery,
  useGetCommentsQuery,
} from "../services/api";
import { useAppSelector } from "../hooks/useAppSelector";

const UserStatsChart: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useAppSelector((state) => state.ui);
  const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery();
  const { data: posts, isLoading: isLoadingPosts } = useGetPostsQuery();
  const { data: comments, isLoading: isLoadingComments } =
    useGetCommentsQuery();

  if (isLoadingUsers || isLoadingPosts || isLoadingComments) {
    return (
      <div className="text-center dark:text-white">{t("stats.loading")}</div>
    );
  }

  if (!users || !posts || !comments) {
    return (
      <div className="text-center text-red-500 dark:text-red-400">
        {t("stats.error")}
      </div>
    );
  }

  const chartData = users.map((user) => {
    const userPosts = posts.filter((post) => post.userId === user.id);
    const userComments = comments.filter((comment) =>
      userPosts.some((post) => post.id === comment.postId)
    );

    return {
      name: user.name,
      y: userPosts.length,
      commentCount: userComments.length,
    };
  });

  const options: Highcharts.Options = {
    chart: {
      type: "column",
      backgroundColor: theme === "dark" ? "#1F2937" : "#FFFFFF",
    },
    title: {
      text: t("stats.title"),
      style: {
        color: theme === "dark" ? "#FFFFFF" : "#000000",
      },
    },
    xAxis: {
      type: "category",
      title: {
        text: t("Users"),
        style: {
          color: theme === "dark" ? "#D1D5DB" : "#666666",
        },
      },
      labels: {
        style: {
          color: theme === "dark" ? "#D1D5DB" : "#666666",
        },
      },
    },
    yAxis: [
      {
        title: {
          text: t("stats.posts"),
          style: {
            color: theme === "dark" ? "#D1D5DB" : "#666666",
          },
        },
        labels: {
          style: {
            color: theme === "dark" ? "#D1D5DB" : "#666666",
          },
        },
      },
      {
        title: {
          text: t("stats.comments"),
          style: {
            color: theme === "dark" ? "#D1D5DB" : "#666666",
          },
        },
        opposite: true,
        labels: {
          style: {
            color: theme === "dark" ? "#D1D5DB" : "#666666",
          },
        },
      },
    ],
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: t("stats.posts"),
        data: chartData,
        type: "column",
        color: theme === "dark" ? "#60A5FA" : "#3B82F6",
      },
      {
        name: t("stats.comments"),
        data: chartData.map((item) => ({
          name: item.name,
          y: item.commentCount,
        })),
        type: "column",
        yAxis: 1,
        color: theme === "dark" ? "#34D399" : "#10B981",
      },
    ],
    legend: {
      itemStyle: {
        color: theme === "dark" ? "#D1D5DB" : "#666666", // Cambia el color de los textos de la leyenda
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default UserStatsChart;
