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
    getPosts: builder.query<
      { posts: Post[]; totalCount: number },
      { page?: number; limit?: number } | void
    >({
      query: ({ page, limit } = {}) => {
        let queryString = "posts";
        if (page !== undefined && limit !== undefined) {
          queryString += `?_page=${page}&_limit=${limit}`;
        }
        return queryString;
      },
      transformResponse: (response: Post[], meta) => {
        return {
          posts: response,
          totalCount: Number.parseInt(
            meta?.response?.headers.get("X-Total-Count") || "0",
            10
          ),
        };
      },
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
    updatePost: builder.mutation<
      Post,
      { updatedPost: Post; page: number; limit: number }
    >({
      query: ({ updatedPost }) => ({
        url: `posts/${updatedPost.id}`,
        method: "PUT",
        body: updatedPost,
      }),
      invalidatesTags: (_result, _error, { updatedPost }) => [
        { type: "Post", id: updatedPost.id },
      ],
      // Optimistic update
      async onQueryStarted(
        { updatedPost, limit, page },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          api.util.updateQueryData("getPosts", { page, limit }, (draft) => {
            const postIndex = draft.posts.findIndex(
              (post) => post.id === updatedPost.id
            );
            if (postIndex !== -1) {
              draft.posts[postIndex] = updatedPost;
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
    deletePost: builder.mutation<
      void,
      { id: number; page: number; limit: number }
    >({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Post", id }],
      // Optimistic update
      async onQueryStarted({ id, page, limit }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getPosts", { page, limit }, (draft) => {
            const index = draft.posts.findIndex((post) => post.id === id);
            if (index !== -1) {
              draft.posts.splice(index, 1);
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
