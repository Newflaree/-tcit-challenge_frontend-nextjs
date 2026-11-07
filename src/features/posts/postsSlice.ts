import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Post {
  id: number;
  name: string;
  description: string;
}

export interface PostsUiState {
  filterName: string;
  postToDeleteId: number | null;
}

const initialState: PostsUiState = {
  filterName: "",
  postToDeleteId: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setFilterName(state, action: PayloadAction<string>) {
      state.filterName = action.payload;
    },
    clearFilter(state) {
      state.filterName = "";
    },
    requestDelete(state, action: PayloadAction<number>) {
      state.postToDeleteId = action.payload;
    },
    cancelDelete(state) {
      state.postToDeleteId = null;
    },
  },
});

export const { setFilterName, clearFilter, requestDelete, cancelDelete } =
  postsSlice.actions;

export const postsReducer = postsSlice.reducer;

export const selectFilterName = (state: { posts: PostsUiState }) =>
  state.posts.filterName;
export const selectPostToDeleteId = (state: { posts: PostsUiState }) =>
  state.posts.postToDeleteId;
export const selectHasActiveFilter = (state: { posts: PostsUiState }) =>
  state.posts.filterName.trim().length > 0;
