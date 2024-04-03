import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Recipe from "src/pages/Recipe/Recipe";
import { MemoryRouter } from "react-router-dom";
import RecipeDetailMock from "./RecipeDetailMock";
import { TodoListsContext } from "src/App";

vi.mock("react-router-dom", async (importOrig) => {
  return {
    ...(await importOrig()),
  };
});
const mockLocationState = {
  recipeDetail: RecipeDetailMock,
};
const mockLocationStateWithoutInstructions = {
  recipeDetail: [{ recipe: { analyzedInstructions: [] } }],
};

describe("Recipe Page with instructions", () => {
  beforeEach(() => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/", state: mockLocationState }]}
      >
        <TodoListsContext.Provider
          value={{ todoLists: [], setTodoLists: vi.fn() }}
        >
          <Recipe />
        </TodoListsContext.Provider>
      </MemoryRouter>
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("render recipe page", async () => {
    expect(screen.getAllByTestId("recipe")).toBeTruthy();
  });
  test("show recipe instruction", async () => {
    // recipe instructions are shown?
    expect(screen.getByTestId("recipe_instruction")).toBeTruthy();
  });
  test("show toolbar", async () => {
    // tool bar is shown?
    expect(screen.getByTestId("toolbar")).toBeTruthy();
  });
  test("show recipe banner", async () => {
    // recipe banner is shown?
    expect(screen.getByTestId("recipe_banner")).toBeTruthy();
  });
  test("when the user click the checkbox in the toolbar, change measure", async () => {
    const toolbar = screen.getByTestId("toolbar");
    const checkbox = toolbar.querySelector("input[type='checkbox']");
    // in cups?
    expect(screen.getByText("Walnuts: 1 cup")).toBeTruthy();
    fireEvent.click(checkbox);
    // in gram?
    expect(screen.getByText("Walnuts: 117 g")).toBeTruthy();
  });
});
describe("Recipe page without instructions", () => {
  beforeEach(() => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/", state: mockLocationStateWithoutInstructions },
        ]}
      >
        <TodoListsContext.Provider
          value={{ todoLists: [], setTodoLists: vi.fn() }}
        >
          <Recipe />
        </TodoListsContext.Provider>
      </MemoryRouter>
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("show no instructions when there is no instructions to show", async () => {
    // NO instructions is shown?
    expect(screen.getByText("No instructions")).toBeTruthy();
  });
});
