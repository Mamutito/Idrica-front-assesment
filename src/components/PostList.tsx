import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useGetPostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "../services/api";
import { useAppSelector } from "../hooks/useAppSelector";

const PostList: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { data: posts = [], isLoading, error } = useGetPostsQuery();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  if (isLoading)
    return (
      <div className="text-center dark:text-white">{t("posts.loading")}</div>
    );
  if (error)
    return <div className="text-center text-red-500">{t("posts.error")}</div>;

  const handleEdit = (id: number, title: string, body: string) => {
    setEditingId(id);
    setEditTitle(title);
    setEditBody(body);
  };

  const handleSave = async (id: number, userId: number) => {
    try {
      const updatedPost = {
        id,
        title: editTitle,
        body: editBody,
        userId, // Assuming userId remains the same
      };

      await updatePost({
        ...updatedPost,
      }).unwrap();

      setEditingId(null);
    } catch (err) {
      console.error("Failed to update the post:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm(t("posts.confirmDelete"))) {
      try {
        await deletePost(id).unwrap();
      } catch (err) {
        console.error("Failed to delete the post:", err);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200 flex flex-col h-full"
        >
          {editingId === post.id ? (
            <div className="p-6 flex flex-col flex-grow">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full mb-4 p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder={t("posts.titlePlaceholder")}
              />
              <textarea
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                className="w-full mb-4 p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 flex-grow"
                rows={4}
                placeholder={t("posts.bodyPlaceholder")}
              />
              <div className="flex justify-end space-x-2 mt-auto">
                <button
                  onClick={() => handleSave(post.id, post.userId)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  {t("posts.save")}
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  {t("posts.cancel")}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="p-6 flex-grow">
                <h2 className="text-xl font-semibold mb-2 dark:text-white">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{post.body}</p>
              </div>
              {isAuthenticated && (
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 mt-auto border-t dark:border-gray-600">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(post.id, post.title, post.body)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      {t("posts.edit")}
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      {t("posts.delete")}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
