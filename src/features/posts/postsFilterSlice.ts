import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PostsFilterState {
  name: string;
}

const initialState: PostsFilterState = { name: "" };

const postsFilterSlice = createSlice({
  name: "postsFilter",
  initialState,
  reducers: {
    setFilterName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    resetFilter(state) {
      state.name = "";
    },
  },
});

export const { setFilterName, resetFilter } = postsFilterSlice.actions;
export const postsFilterReducer = postsFilterSlice.reducer;
export const selectFilterName = (state: { postsFilter: PostsFilterState }) =>
  state.postsFilter.name;
