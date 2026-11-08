import { render, screen } from "@testing-library/react";

import { AppLayout } from "@/posts/presentation/layouts/AppLayout";

describe("AppLayout", () => {
  it("renderiza children dentro de los providers", () => {
    render(
      <AppLayout>
        <div>contenido</div>
      </AppLayout>,
    );
    expect(screen.getByText("contenido")).toBeInTheDocument();
  });
});
