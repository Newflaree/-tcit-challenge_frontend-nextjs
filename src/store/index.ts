import { configureStore } from "@reduxjs/toolkit";
import { postsFilterReducer } from "@/features/posts/postsFilterSlice";
import { postsReducer } from "@/features/posts/postsSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    postsFilter: postsFilterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
