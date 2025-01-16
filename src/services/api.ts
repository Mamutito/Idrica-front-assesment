import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post, User } from "../types/api";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  tagTypes: ["Post", "User", "Comment"],
  endpoints: (builder) => ({
    // Posts
    getPosts: builder.query<Post[], void>({
      query: () => "posts",
      providesTags: ["Post"],
    }),
    getPost: builder.query<Post, number>({
      query: (id) => `posts/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Post", id }],
    }),
    addPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: "posts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation<Post, Partial<Post> & Pick<Post, "id">>({
      query: ({ id, ...patch }) => ({
        url: `posts/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Post", id }],
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Post", id }],
    }),

    // Users
    getUsers: builder.query<User[], void>({
      query: () => "users",
      providesTags: ["User"],
    }),
    getUser: builder.query<User, number>({
      query: (id) => `users/${id}`,
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),

    // Comments
    getComments: builder.query<Comment[], void>({
      query: () => "comments",
      providesTags: ["Comment"],
    }),
    getPostComments: builder.query<Comment[], number>({
      query: (postId) => `posts/${postId}/comments`,
      providesTags: (_result, _error, postId) => [
        { type: "Comment", id: `post-${postId}` },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useGetCommentsQuery,
  useGetPostCommentsQuery,
} = api;
