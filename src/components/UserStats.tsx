import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  useGetUsersQuery,
  useGetPostsQuery,
  useGetCommentsQuery,
} from "../services/api";
import { useTranslation } from "react-i18next";

const UserStats: React.FC = () => {
  const { t } = useTranslation();
  const { data: users } = useGetUsersQuery();
  const { data: posts } = useGetPostsQuery();
  const { data: comments } = useGetCommentsQuery();

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: t("userStats"),
    },
    xAxis: {
      categories: users?.map((user) => user.name) || [],
    },
    yAxis: [
      {
        title: {
          text: t("posts"),
        },
      },
      {
        title: {
          text: t("comments"),
        },
        opposite: true,
      },
    ],
    series: [
      {
        name: t("posts"),
        data:
          users?.map(
            (user) => posts?.filter((post) => post.userId === user.id).length
          ) || [],
      },
      {
        name: t("comments"),
        yAxis: 1,
        data:
          users?.map((user) => {
            const userPosts =
              posts?.filter((post) => post.userId === user.id) || [];
            return (
              comments?.filter((comment) =>
                userPosts.some((post) => post.id === comment.postId)
              ).length || 0
            );
          }) || [],
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default UserStats;
