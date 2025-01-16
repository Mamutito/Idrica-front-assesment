import React, { useState } from "react";
import { useAddPostMutation } from "../services/api";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [addPost, { isLoading }] = useAddPostMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addPost({ title, body, userId: 1 }).unwrap();
      setTitle("");
      setBody("");
      alert("Post creado con éxito!");
    } catch (error) {
      console.error("Failed to create the post: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Nuevo Post</h2>
      <div>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="body">Contenido:</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creando..." : "Crear Post"}
      </button>
    </form>
  );
};

export default CreatePost;
