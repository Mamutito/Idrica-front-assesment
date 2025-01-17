import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAddPostMutation } from "../services/api";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [addPost, { isLoading }] = useAddPostMutation();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addPost({ title, body, userId: 1 }).unwrap();
      setTitle("");
      setBody("");
      alert(t("createPost.success"));
    } catch (error) {
      console.error("Failed to create the post: ", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        {t("createPost.title")}
      </h2>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
        >
          {t("createPost.postTitle")}:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="body"
          className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
        >
          {t("createPost.content")}:
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white"
          rows={4}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          {isLoading ? t("createPost.submitting") : t("createPost.submit")}
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
