import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    allPosts: {
      posts: [],
      pending: false,
      error: false,
    },
    onePost: {
      post: null,
      pending: false,
      error: false,
    },
    createPost: {
      pending: false,
      error: false,
    },
    deletePost: {
      pending: false,
      error: false,
    },
    updatePost: {
      pending: false,
      error: false,
    },
  },
  reducers: {
    getAllPostStart: (state) => {
      state.allPosts.pending = true;
    },
    getAllPostSuccess: (state, action) => {
      state.allPosts.pending = false;
      state.allPosts.posts = action.payload;
    },
    getAllPostFailed: (state) => {
      state.allPosts.pending = false;
      state.allPosts.error = true;
    },
    getOnePostStart: (state) => {
      state.onePost.pending = true;
    },
    getOnePostSuccess: (state, action) => {
      state.onePost.pending = false;
      state.onePost.post = action.payload;
    },
    getOnePostFailed: (state) => {
      state.onePost.pending = false;
      state.onePost.error = true;
    },
    createPostStart: (state) => {
      state.createPost.pending = true;
    },
    createPostSuccess: (state) => {
      state.createPost.pending = false;
      state.createPost.error = false;
    },
    createPostFailed: (state) => {
      state.createPost.pending = false;
      state.createPost.error = true;
    },
    deletePostStart: (state) => {
      state.deletePost.pending = true;
    },
    deletePostSuccess: (state) => {
      state.deletePost.pending = false;
      state.deletePost.error = false;
    },
    deletePostFailed: (state) => {
      state.deletePost.pending = false;
      state.deletePost.error = true;
    },
    updatePostStart: (state) => {
      state.updatePost.pending = true;
    },
    updatePostSuccess: (state) => {
      state.updatePost.pending = false;
      state.updatePost.error = false;
    },
    updatePostFailed: (state) => {
      state.updatePost.pending = false;
      state.updatePost.error = true;
    },
  },
});

export const {
  getAllPostStart,
  getAllPostSuccess,
  getAllPostFailed,
  getOnePostStart,
  getOnePostSuccess,
  getOnePostFailed,
  createPostStart,
  createPostSuccess,
  createPostFailed,
  deletePostStart,
  deletePostSuccess,
  deletePostFailed,
  updatePostStart,
  updatePostSuccess,
  updatePostFailed,
} = postSlice.actions;
export default postSlice.reducer;
