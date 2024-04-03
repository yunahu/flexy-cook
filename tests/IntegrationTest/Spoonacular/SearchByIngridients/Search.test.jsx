import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import env from "src/utils/env";
import Search from "src/pages/Search/Search";
import SearchRecipeMock from "./SearchRecipeMock";
import GetRecipeMock from "./GetRecipeMock";
import GetRecipeTasteMock from "./GetRecipeTasteMock";
import { MemoryRouter } from "react-router-dom";

const mockUseNavigate = vi.fn();
const mockLocationState = {
  ingredients: "salmon",
  tags: [
    {
      amount: "300",
      minOrMax: "Max",
      nutrient: "Calories",
      scale: "kcal",
    },
  ],
};

const mockLocationState2 = {
  search: "lkanflakndlawknd",
};

vi.mock("axios");
vi.mock("react-router-dom", async (importOrig) => {
  return {
    ...(await importOrig()),
    useNavigate: () => mockUseNavigate,
  };
});

describe("Search Page with passed nutrients /& ingredients", () => {
  beforeEach(() => {
    axios.get.mockClear();
    axios.get.mockResolvedValueOnce({
      data: SearchRecipeMock,
    });

    for (let i = 0; i < 6; i++) {
      axios.get.mockResolvedValueOnce({
        data: { ...GetRecipeMock, title: `Test title ${i}`, id: i },
      });

      axios.get.mockResolvedValueOnce({
        data: GetRecipeTasteMock,
      });
    }

    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/", state: mockLocationState }]}
      >
        <Search />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("render advanced search menu", async () => {
    const advanced_menu = screen.getByTestId("advanced_search");
    // advanced search dropdown is rendered?
    expect(advanced_menu).toBeTruthy();
  });

  test("render search bar", async () => {
    // search form is rendered?
    expect(
      screen.getByPlaceholderText("Enter ingredients with comma-separated list")
    ).toBeTruthy();

    const searchBar_button = screen.getByTestId("searchbar_button");
    // search button is rendered?
    expect(searchBar_button).toBeTruthy();
  });

  test("when the information passed through the state, fetch recipe", async () => {
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${env.API_URL}/spoonacular/searchRecipe`,
        {
          params: {
            offset: 0,
            includeIngredients: mockLocationState.ingredients,
            number: 6,
            maxCalories: "300",
          },
        }
      );
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${env.API_URL}/spoonacular/getRecipe`,
        {
          params: {
            id: 637335,
            includeNutrition: true,
          },
        }
      );
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${env.API_URL}/spoonacular/getRecipeTaste`,
        {
          params: {
            id: 637335,
            normalize: true,
          },
        }
      );
    });
    // axios get called?
    expect(axios.get).toHaveBeenCalledTimes(13);
  });

  test("show recipes", async () => {
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${env.API_URL}/spoonacular/searchRecipe`,
        {
          params: {
            offset: 0,
            includeIngredients: mockLocationState.ingredients,
            number: 6,
            maxCalories: "300",
          },
        }
      );
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${env.API_URL}/spoonacular/getRecipe`,
        {
          params: {
            id: 637335,
            includeNutrition: true,
          },
        }
      );
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${env.API_URL}/spoonacular/getRecipeTaste`,
        {
          params: {
            id: 637335,
            normalize: true,
          },
        }
      );
    });

    // first 6 cards are shown?
    expect(screen.getByText("Test title 0")).toBeTruthy;
    expect(screen.getByText("Test title 1")).toBeTruthy;
    expect(screen.getByText("Test title 2")).toBeTruthy;
    expect(screen.getByText("Test title 3")).toBeTruthy;
    expect(screen.getByText("Test title 4")).toBeTruthy;
    expect(screen.getByText("Test title 5")).toBeTruthy;
  });
});

describe("Search Page without passed nutrients /& ingredients", () => {
  beforeEach(() => {
    axios.get.mockClear();
    axios.get.mockResolvedValueOnce({
      data: SearchRecipeMock,
    });

    for (let i = 0; i < 6; i++) {
      axios.get.mockResolvedValueOnce({
        data: { ...GetRecipeMock, title: `Test title ${i}`, id: i },
      });

      axios.get.mockResolvedValueOnce({
        data: GetRecipeTasteMock,
      });
    }

    axios.get.mockResolvedValueOnce({
      data: SearchRecipeMock,
    });

    for (let i = 6; i < 13; i++) {
      axios.get.mockResolvedValueOnce({
        data: { ...GetRecipeMock, title: `Test title ${i}`, id: i },
      });

      axios.get.mockResolvedValueOnce({
        data: GetRecipeTasteMock,
      });
    }

    const mockLocationState = {
      ingredients: "salmon",
      tags: [
        {
          amount: "300",
          minOrMax: "Max",
          nutrient: "Calories",
          scale: "kcal",
        },
      ],
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("from the info that the user enter, fetch recipe", async () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/", state: { search: "salmon" } }]}
      >
        <Search />
      </MemoryRouter>
    );
    const advanced_menu = screen.getByTestId("advanced_search");
    // advanced search dropdown is rendered?
    expect(advanced_menu).toBeTruthy();

    // search bar form is rendered?
    expect(
      screen.getByPlaceholderText("Enter ingredients with comma-separated list")
    ).toBeTruthy();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${env.API_URL}/spoonacular/searchRecipe`,
        {
          params: {
            offset: 0,
            number: 6,
            includeIngredients: "salmon",
          },
        }
      );
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${env.API_URL}/spoonacular/getRecipe`,
        {
          params: {
            id: 637335,
            includeNutrition: true,
          },
        }
      );
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${env.API_URL}/spoonacular/getRecipeTaste`,
        {
          params: {
            id: 637335,
            normalize: true,
          },
        }
      );
    });

    // first 6 cards are shown?
    expect(screen.getByText("Test title 0")).toBeTruthy;
    expect(screen.getByText("Test title 1")).toBeTruthy;
    expect(screen.getByText("Test title 2")).toBeTruthy;
    expect(screen.getByText("Test title 3")).toBeTruthy;
    expect(screen.getByText("Test title 4")).toBeTruthy;
    expect(screen.getByText("Test title 5")).toBeTruthy;
  });

  test("when the recipe is loading, show loading", async () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/", state: { search: "salmon" } }]}
      >
        <Search />
      </MemoryRouter>
    );
    const advanced_menu = screen.getByTestId("advanced_search");
    // advanced search dropdown is rendered?
    expect(advanced_menu).toBeTruthy();

    // search bar form is rendered?
    expect(
      screen.getByPlaceholderText("Enter ingredients with comma-separated list")
    ).toBeTruthy();

    const searchBar_button = screen.getByTestId("searchbar_button");
    // search button is rendered?
    expect(searchBar_button).toBeTruthy();

    // loading... is shown?
    await waitFor(() => {
      expect(screen.getByTestId("loading")).toBeTruthy();
      expect(axios.get).toHaveBeenCalledWith(
        `${env.API_URL}/spoonacular/searchRecipe`,
        {
          params: {
            offset: 0,
            number: 6,
            includeIngredients: "salmon",
          },
        }
      );
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${env.API_URL}/spoonacular/getRecipe`,
        {
          params: {
            id: 637335,
            includeNutrition: true,
          },
        }
      );
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${env.API_URL}/spoonacular/getRecipeTaste`,
        {
          params: {
            id: 637335,
            normalize: true,
          },
        }
      );
    });
  });

  test("when the user scroll, fetch more recipe", async () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/", state: { search: "salmon" } }]}
      >
        <Search />
      </MemoryRouter>
    );

    const advanced_menu = screen.getByTestId("advanced_search");
    // advanced search dropdown is rendered?
    expect(advanced_menu).toBeTruthy();

    // search bar form is rendered?
    expect(
      screen.getByPlaceholderText("Enter ingredients with comma-separated list")
    ).toBeTruthy();

    const searchBar_button = screen.getByTestId("searchbar_button");
    // search button is rendered?
    expect(searchBar_button).toBeTruthy();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${env.API_URL}/spoonacular/searchRecipe`,
        {
          params: {
            offset: 0,
            number: 6,
            includeIngredients: "salmon",
          },
        }
      );
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${env.API_URL}/spoonacular/getRecipe`,
        {
          params: {
            id: 637335,
            includeNutrition: true,
          },
        }
      );
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${env.API_URL}/spoonacular/getRecipeTaste`,
        {
          params: {
            id: 637335,
            normalize: true,
          },
        }
      );
    });

    // first 6 cards are shown?
    expect(screen.getByText("Test title 0")).toBeTruthy();
    expect(screen.getByText("Test title 1")).toBeTruthy();
    expect(screen.getByText("Test title 2")).toBeTruthy();
    expect(screen.getByText("Test title 3")).toBeTruthy();
    expect(screen.getByText("Test title 4")).toBeTruthy();
    expect(screen.getByText("Test title 5")).toBeTruthy();

    fireEvent.scroll(window, { target: { scrollY: 100 } });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${env.API_URL}/spoonacular/searchRecipe`,
        {
          params: {
            offset: 6,
            number: 6,
            includeIngredients: "salmon",
          },
        }
      );
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${env.API_URL}/spoonacular/getRecipe`,
        {
          params: {
            id: 637335,
            includeNutrition: true,
          },
        }
      );
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${env.API_URL}/spoonacular/getRecipeTaste`,
        {
          params: {
            id: 637335,
            normalize: true,
          },
        }
      );
    });

    // 12 cards are shown?
    await waitFor(() => {
      expect(screen.getByText("Test title 6")).toBeInTheDocument();
      expect(screen.getByText("Test title 7")).toBeTruthy();
      expect(screen.getByText("Test title 8")).toBeTruthy();
      expect(screen.getByText("Test title 9")).toBeTruthy();
      expect(screen.getByText("Test title 10")).toBeTruthy();
      expect(screen.getByText("Test title 11")).toBeTruthy();
    });
  });

  test("recommendation tags are shown", async () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    // Recommendation tags are shown?
    expect(screen.getByTestId("Tag_0")).toBeTruthy();
    expect(screen.getByTestId("Tag_1")).toBeTruthy();
    expect(screen.getByTestId("Tag_2")).toBeTruthy();
    expect(screen.getByTestId("Tag_3")).toBeTruthy();
    expect(screen.getByTestId("Tag_4")).toBeTruthy();
    expect(screen.getByTestId("Tag_5")).toBeTruthy();
    expect(screen.getByTestId("Tag_6")).toBeTruthy();
    expect(screen.getByTestId("Tag_7")).toBeTruthy();
  });

  test("recommendation tags are clickable", async () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    // Recommendation tags are button
    userEvent.click(screen.getByTestId("Tag_0"));
  });

  test("if no recipe found, show Recipe Not Found", async () => {
    axios.get.mockRestore();
    axios.get.mockResolvedValue({
      data: {
        results: [],
      },
    });

    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
    const advanced_menu = screen.getByTestId("advanced_search");
    // advanced search dropdown is rendered?
    expect(advanced_menu).toBeTruthy();

    // search bar form is rendered?
    expect(
      screen.getByPlaceholderText("Enter ingredients with comma-separated list")
    ).toBeTruthy();

    const searchBar_button = screen.getByTestId("searchbar_button");
    // search button is rendered?
    expect(searchBar_button).toBeTruthy();

    await userEvent.type(screen.getByRole("textbox"), "asidhaihsida");
    expect(screen.getByRole("textbox")).toHaveValue("asidhaihsida");
    await userEvent.click(screen.getByText("search"));

    expect(mockUseNavigate).toBeCalledTimes(1);

    // await waitFor(() => {
    //   expect(axios.get).toHaveBeenCalledWith(
    //     `${env.API_URL}/spoonacular/searchRecipe`,
    //     {
    //       params: {
    //         offset: 0,
    //         number: 6,
    //         includeIngredients: "asidhaihsida",
    //       },
    //     }
    //   );
    // });

    // axios is only called once?
    // expect(axios.get).toHaveBeenCalledTimes(1);

    // recipe not found is shown?
    // await waitFor(() => {
    //   expect(screen.getAllByTestId("not_found")).toBeTruthy();
    // });
  });

  test("if no recipe found, show Recipe Not Found", async () => {
    axios.get.mockRestore();
    axios.get.mockResolvedValue({
      data: {
        results: [],
      },
    });

    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/", state: mockLocationState2 }]}
      >
        <Search />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${env.API_URL}/spoonacular/searchRecipe`,
        {
          params: {
            offset: 0,
            number: 6,
            includeIngredients: mockLocationState2.search,
          },
        }
      );
    });

    // axios is only called once?
    expect(axios.get).toHaveBeenCalledTimes(1);

    // recipe not found is shown?
    await waitFor(() => {
      expect(screen.getAllByTestId("not_found")).toBeTruthy();
    });
  });
});
