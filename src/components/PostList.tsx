import React from "react";
import { useGetPostsQuery } from "../services/api";

const PostList: React.FC = () => {
  const { data: posts, isLoading, error } = useGetPostsQuery();

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los posts</div>;

  return (
    <div>
      <h1>Lista de Posts</h1>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
