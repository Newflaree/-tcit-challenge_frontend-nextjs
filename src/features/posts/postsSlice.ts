import { createSlice } from "@reduxjs/toolkit";

export interface Post {
  id: number;
  name: string;
  description: string;
}

export interface PostsState {
  items: Post[];
}

const initialState: PostsState = {
  items: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export const postsReducer = postsSlice.reducer;
