import type React from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetPostQuery, useGetPostCommentsQuery } from "../services/api";

const PostComments: React.FC = () => {
  const { t } = useTranslation();
  const { postId } = useParams<{ postId: string }>();
  const { data: post, isLoading: isLoadingPost } = useGetPostQuery(
    Number(postId)
  );
  const { data: comments, isLoading: isLoadingComments } =
    useGetPostCommentsQuery(Number(postId));

  if (isLoadingPost || isLoadingComments) {
    return <div className="text-center">{t("posts.loading")}</div>;
  }

  if (!post) {
    return <div className="text-center">{t("post.notFound")}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">{post.title}</h2>
      <p className="mb-6 dark:text-gray-300">{post.body}</p>
      <h3 className="text-xl font-bold mb-4 dark:text-white">
        {t("post.comments")}
      </h3>
      {comments && comments.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="bg-gray-100 dark:bg-gray-700 p-4 rounded"
            >
              <h4 className="font-bold dark:text-white">{comment.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {comment.email}
              </p>
              <p className="mt-2 dark:text-gray-300">{comment.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="dark:text-gray-300">{t("post.noComments")}</p>
      )}
      <div className="mt-6">
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {t("post.backToList")}
        </Link>
      </div>
    </div>
  );
};

export default PostComments;
