import { useState } from "react";
import {
  useGetPostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "../services/api";
import { POSTS_PER_PAGE } from "../constants/post";

const usePostList = () => {
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data = { posts: [], totalCount: 0 },
    isLoading,
    error,
  } = useGetPostsQuery({ page: currentPage, limit: POSTS_PER_PAGE });

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
        userId,
      };
      await updatePost({
        updatedPost,
        page: currentPage,
        limit: POSTS_PER_PAGE,
      }).unwrap();
      setEditingId(null);
    } catch (err) {
      console.error("Failed to update the post:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost({
          id,
          page: currentPage,
          limit: POSTS_PER_PAGE,
        }).unwrap();
      } catch (err) {
        console.error("Failed to delete the post:", err);
      }
    }
  };

  const posts = data?.posts;
  const totalCount = data?.totalCount;
  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

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
    currentPage,
    totalPages,
    setCurrentPage,
  };
};

export default usePostList;
