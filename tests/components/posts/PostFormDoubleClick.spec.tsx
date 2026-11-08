import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createQueryClient } from "@/lib/query-client";
import { PostForm } from "@/posts/presentation/components/PostForm";
import { Provider } from "react-redux";
import { store } from "@/store";
import { server } from "@/test/mocks/server";

function Wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = createQueryClient();
  queryClient.setQueryData(["posts"], []);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
}

describe("PostForm doble clic", () => {
  it("no genera dos requests al hacer doble clic", async () => {
    const user = userEvent.setup();
    let postCalls = 0;
    server.events.on("request:start", ({ request }) => {
      if (request.method === "POST" && request.url.includes("/posts")) {
        postCalls += 1;
      }
    });

    render(<PostForm />, { wrapper: Wrapper });

    await user.type(screen.getByLabelText(/Nombre/), "Post doble clic");
    await user.type(screen.getByLabelText(/Descripción/), "Desc");

    const button = screen.getByRole("button", { name: "Crear post" });
    // Double click rapidly
    await user.dblClick(button);

    await waitFor(() => {
      // Only one POST should have been made
      expect(postCalls).toBe(1);
    });

    server.events.removeAllListeners("request:start");
  });
});
