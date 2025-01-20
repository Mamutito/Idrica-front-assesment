import React from "react";
import { Link } from "react-router-dom";

const PostItem: React.FC<{
  post: { id: number; title: string; body: string; userId: number };
  isAuthenticated: boolean;
  onEdit: () => void;
  onDelete: () => void;
  t: (key: string) => string;
}> = ({ post, isAuthenticated, onEdit, onDelete, t }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200 flex flex-col h-full">
      {isAuthenticated ? (
        <>
          <Link to={`/post/${post.id}/comments`}>
            <div className="p-6 flex-grow">
              <h2 className="text-xl font-semibold mb-2 dark:text-white">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">{post.body}</p>
            </div>
          </Link>
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 mt-auto border-t dark:border-gray-600">
            <div className="flex justify-end space-x-2">
              <button
                onClick={onEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                {t("posts.edit")}
              </button>
              <button
                onClick={onDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                {t("posts.delete")}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="p-6 flex-grow">
          <h2 className="text-xl font-semibold mb-2 dark:text-white">
            {post.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{post.body}</p>
        </div>
      )}
    </div>
  );
};

export default PostItem;
