import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CommentPost, Post, User } from "../types/api";

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
      // Optimistic update
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getPosts", undefined, (draft) => {
            const post = draft.find((post) => post.id === id);
            if (post) {
              Object.assign(post, patch);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Post", id }],
      // Optimistic update
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getPosts", undefined, (draft) => {
            const index = draft.findIndex((post) => post.id === id);
            if (index !== -1) {
              draft.splice(index, 1);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
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
    getComments: builder.query<[CommentPost], void>({
      query: () => "comments",
      providesTags: ["Comment"],
    }),
    getPostComments: builder.query<CommentPost[], number>({
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
