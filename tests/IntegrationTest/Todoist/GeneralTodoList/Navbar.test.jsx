import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Navbar from "src/components/Navbar/Navbar";
import { MemoryRouter } from "react-router-dom";
import { TodoListsContext } from "src/App";

const mockUseNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockUseNavigate,
}));
vi.mock("react-router-dom", async (importOrig) => {
  return {
    ...(await importOrig()),
  };
});

describe("NavBar", () => {
  test("render successfully", async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/" }]}>
        <TodoListsContext.Provider
          value={{ todoLists: [], setTodoLists: vi.fn() }}
        >
          <Navbar />
        </TodoListsContext.Provider>
      </MemoryRouter>
    );
  });
});
