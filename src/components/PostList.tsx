import React from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../hooks/useAppSelector";
import PostItem from "./PostItem";
import PostEditor from "./PostEditor";
import usePostList from "../hooks/usePostList";

const PostList: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const {
    posts,
    isLoading,
    error,
    editingId,
    editTitle,
    editBody,
    setEditTitle,
    setEditBody,
    handleEdit,
    handleSave,
    handleDelete,
    setEditingId,
  } = usePostList();

  if (isLoading) {
    return (
      <div className="text-center dark:text-white">{t("posts.loading")}</div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{t("posts.error")}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) =>
        editingId === post.id ? (
          <PostEditor
            key={post.id}
            title={editTitle}
            body={editBody}
            onChangeTitle={setEditTitle}
            onChangeBody={setEditBody}
            onSave={() => handleSave(post.id, post.userId)}
            onCancel={() => setEditingId(null)}
          />
        ) : (
          <PostItem
            key={post.id}
            post={post}
            isAuthenticated={isAuthenticated}
            onEdit={() => handleEdit(post.id, post.title, post.body)}
            onDelete={() => handleDelete(post.id)}
            t={t}
          />
        )
      )}
    </div>
  );
};

export default PostList;
