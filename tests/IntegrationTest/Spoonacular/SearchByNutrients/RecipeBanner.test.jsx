import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import RecipeBanner from "src/pages/Recipe/components/RecipeBanner/RecipeBanner";
import { MemoryRouter } from "react-router-dom";

const ingredients = ["Salt: 1 tsp", "Sugar: 2 cups"];
const title = "cream pasta";
const size = "2";
const time = "45";
const calories = "560";
const img = "pasta.jpg";
const tags = [
  {
    key: "cuisine",
    text: "Japanese",
    type: "success",
  },
  { key: "diet", text: "Dairy free", type: "warning" },
];

describe("Recipe Banner", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/" }]}>
        <RecipeBanner
          ingredients={ingredients}
          title={title}
          size={size}
          time={time}
          calories={calories}
          image={img}
          tags={tags}
        />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("render recipe banner", async () => {
    // recipe banner is rendered?
    expect(screen.getAllByTestId("recipe_banner")).toBeTruthy();
  });
  test("show ingredients", async () => {
    // ingredients are shown?
    expect(screen.queryAllByText("Salt: 1 tsp")).toBeTruthy();
    expect(screen.queryAllByText("Sugar: 2 cups")).toBeTruthy();
  });
  test("show title", async () => {
    // title is shown?
    expect(screen.queryAllByText("cream pasta")).toBeTruthy();
  });
  test("show cooking info", async () => {
    // cooking info is shown?
    expect(
      screen.queryAllByText("560 kcal 45 minitues 2 servings")
    ).toBeTruthy();
  });
  test("show image", async () => {
    // image is shown?
    expect(screen.getAllByTestId("banner_img")).toBeTruthy();
  });
  test("show tags", async () => {
    // tags are shown?
    expect(screen.getAllByText("Japanese")).toBeTruthy();
    expect(screen.getAllByText("Dairy free")).toBeTruthy();
  });
});
