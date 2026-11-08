import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createQueryClient } from "@/shared/lib/query-client";
import { PostFilter } from "@/posts/presentation/components/PostFilter";
import { PostList } from "@/posts/presentation/components/PostList";
import { Provider } from "react-redux";
import { store } from "@/shared/store";
import { setFilterName } from "@/posts/presentation/store/postsSlice";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { useFilteredPosts } from "@/posts/presentation/hooks/useFilteredPosts";

function FilteredList() {
  const dispatch = useAppDispatch();
  const filterName = useAppSelector((s) => s.posts.filterName);
  const { posts } = useFilteredPosts();

  return (
    <div>
      <PostFilter
        value={filterName}
        onChange={(v) => dispatch(setFilterName(v))}
      />
      <PostList posts={posts} />
    </div>
  );
}

describe("Integración: filtro actualiza Redux y la lista visible", () => {
  it("escribir en el input filtra la lista sin petición HTTP adicional", async () => {
    const user = userEvent.setup();
    const queryClient = createQueryClient();
    queryClient.setQueryData(
      ["posts"],
      [
        { id: 1, name: "Primer post", description: "desc" },
        { id: 2, name: "Segundo elemento", description: "desc" },
      ],
    );

    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <FilteredList />
        </QueryClientProvider>
      </Provider>,
    );

    // Initially both posts are visible
    await waitFor(() => {
      expect(screen.getByText("Primer post")).toBeInTheDocument();
      expect(screen.getByText("Segundo elemento")).toBeInTheDocument();
    });

    // Type in the filter
    const input = screen.getByPlaceholderText("Filtrar por nombre...");
    await user.type(input, "segundo");

    // Redux state updated
    expect(store.getState().posts.filterName).toBe("segundo");

    // List filtered
    await waitFor(() => {
      expect(screen.queryByText("Primer post")).not.toBeInTheDocument();
      expect(screen.getByText("Segundo elemento")).toBeInTheDocument();
    });
  });
});
