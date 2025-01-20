import { useState } from "react";
import {
  useGetPostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "../services/api";

const usePostList = () => {
  const { data: posts = [], isLoading, error } = useGetPostsQuery();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  const handleEdit = (id: number, title: string, body: string) => {
    setEditingId(id);
    setEditTitle(title);
    setEditBody(body);
  };

  const handleSave = async (id: number, userId: number) => {
    try {
      const updatedPost = { id, title: editTitle, body: editBody, userId };
      await updatePost(updatedPost).unwrap();
      setEditingId(null);
    } catch (err) {
      console.error("Failed to update the post:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id).unwrap();
      } catch (err) {
        console.error("Failed to delete the post:", err);
      }
    }
  };

  return {
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
  };
};

export default usePostList;
