import { useQuery } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";

import { createQueryClient } from "@/lib/query-client";
import { useAppSelector } from "@/store/hooks";
import { store } from "@/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

function MixedComponent() {
  const filter = useAppSelector((state) => state.posts?.items?.length ?? 0);
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => [1, 2],
  });

  return (
    <div>
      <span data-testid="redux">{filter}</span>
      <span data-testid="query">{data?.length ?? 0}</span>
    </div>
  );
}

describe("Mixed Redux + Query", () => {
  it("un componente puede usar useAppSelector y useQuery a la vez", async () => {
    const queryClient = createQueryClient();

    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MixedComponent />
        </QueryClientProvider>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("query")).toHaveTextContent("2");
    });
    expect(screen.getByTestId("redux")).toHaveTextContent("0");
  });
});
