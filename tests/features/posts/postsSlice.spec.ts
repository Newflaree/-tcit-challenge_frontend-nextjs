import { configureStore } from "@reduxjs/toolkit";

import {
  cancelDelete,
  clearFilter,
  requestDelete,
  selectFilterName,
  selectHasActiveFilter,
  selectPostToDeleteId,
  setFilterName,
  postsReducer,
} from "@/posts/presentation/store/postsSlice";
import { filterPostsByName } from "@/posts/application/filter-posts";
import type { Post } from "@/posts/domain/Post";

describe("postsSlice (Redux UI state)", () => {
  it("estado inicial correcto", () => {
    const store = configureStore({ reducer: { posts: postsReducer } });
    expect(store.getState().posts.filterName).toBe("");
    expect(store.getState().posts.postToDeleteId).toBeNull();
  });

  it("setFilterName actualiza el valor", () => {
    const store = configureStore({ reducer: { posts: postsReducer } });
    store.dispatch(setFilterName("react"));
    expect(store.getState().posts.filterName).toBe("react");
    expect(selectFilterName(store.getState())).toBe("react");
  });

  it("clearFilter vuelve a string vacío", () => {
    const store = configureStore({ reducer: { posts: postsReducer } });
    store.dispatch(setFilterName("react"));
    store.dispatch(clearFilter());
    expect(store.getState().posts.filterName).toBe("");
  });

  it("requestDelete y cancelDelete actualizan el id", () => {
    const store = configureStore({ reducer: { posts: postsReducer } });
    store.dispatch(requestDelete(42));
    expect(store.getState().posts.postToDeleteId).toBe(42);
    expect(selectPostToDeleteId(store.getState())).toBe(42);
    store.dispatch(cancelDelete());
    expect(store.getState().posts.postToDeleteId).toBeNull();
  });

  it("selectHasActiveFilter refleja si hay filtro", () => {
    const store = configureStore({ reducer: { posts: postsReducer } });
    expect(selectHasActiveFilter(store.getState())).toBe(false);
    store.dispatch(setFilterName("  react  "));
    expect(selectHasActiveFilter(store.getState())).toBe(true);
    store.dispatch(setFilterName("   "));
    expect(selectHasActiveFilter(store.getState())).toBe(false);
  });
});

describe("filterPostsByName (función pura)", () => {
  const posts: Post[] = [
    { id: 1, name: "Primer post", description: "desc" },
    { id: 2, name: "Segundo post", description: "desc" },
    { id: 3, name: "Tercer elemento", description: "desc" },
  ];

  it("filtro vacío devuelve todos los posts", () => {
    expect(filterPostsByName(posts, "")).toEqual(posts);
    expect(filterPostsByName(posts, "   ")).toEqual(posts);
  });

  it("filtra por substring case-insensitive", () => {
    expect(filterPostsByName(posts, "segundo")).toEqual([posts[1]]);
    expect(filterPostsByName(posts, "SEGUNDO")).toEqual([posts[1]]);
    expect(filterPostsByName(posts, "post")).toEqual([posts[0], posts[1]]);
  });

  it("tolera espacios al inicio/fin", () => {
    expect(filterPostsByName(posts, "  segundo  ")).toEqual([posts[1]]);
  });

  it("no muta el array original", () => {
    const copy = [...posts];
    filterPostsByName(posts, "post");
    expect(posts).toEqual(copy);
  });
});
