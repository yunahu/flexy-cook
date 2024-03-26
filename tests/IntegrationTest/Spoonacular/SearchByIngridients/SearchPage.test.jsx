import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import env from "src/utils/env";
import SearchTest from "src/pages/Search/components/SearchPage.jsx";
import SearchRecipeMock from "./SearchRecipeMock";
import GetRecipeMock from "./GetRecipeMock";
import GetRecipeTasteMock from "./GetRecipeTasteMock";
import { useNavigate, useLocation } from "react-router-dom";
import * as router from "react-router";

const mockUseNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockUseNavigate,
}));

describe("Search Page with passed nutrients /& ingredients", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  vi.mock("react-router-dom", () => ({
    // useLocation: () =>
    //   vi.fn().mockReturnValue({
    //     pathname: "",
    //     state: {
    //       ingredients: "salmon",
    //       tags: [
    //         {
    //           amount: "300",
    //           minOrMax: "Max",
    //           nutrient: "Calories",
    //           scale: "kcal",
    //         },
    //       ],
    //     },
    //   }),
    useLocation: vi.fn().mockImplementation(() => {
      return {
        pathname: "",
        state: {
          ingredients: "salmon",
          tags: [
            {
              amount: "300",
              minOrMax: "Max",
              nutrient: "Calories",
              scale: "kcal",
            },
          ],
        },
        s,
      };
    }),
    useNavigate: () => vi.fn(),
  }));
  const onTagsChangeMock = vi.fn(() => {});

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
    render(<SearchTest />);
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
      screen.getByPlaceholderText("onion, canned tomato, pasta")
    ).toBeTruthy();

    const searchBar_button = screen.getByTestId("searchbar_button");
    // search button is rendered?
    expect(searchBar_button).toBeTruthy();
  });
});

// test("fetch recipe successfully", async () => {
//   // api is called to fetch recipe?
//   //   console.log(document.body.innerHTML);
//   //   expect(screen.getAllByTestId("card_1")).toBeTruthy();

//   //   const useLocation = vi.spyOn(routeData, "useLocation");

//   //   useLocation.mockReturnValue({
//   //     pathname: "",
//   //     state: {
//   //       ingredients: "salmon",
//   //       tags: [
//   //         {
//   //           amount: "300",
//   //           minOrMax: "Max",
//   //           nutrient: "Calories",
//   //           scale: "kcal",
//   //         },
//   //       ],
//   //     },
//   //   });
//   vi.spyOn(router, "useLocation").mockReturnValue({
//     pathname: "",
//     state: {
//       ingredients: "salmon",
//       tags: [
//         {
//           amount: "300",
//           minOrMax: "Max",
//           nutrient: "Calories",
//           scale: "kcal",
//         },
//       ],
//     },
//   });
//   let location = useLocation();
//   console.log("State", location.state);
//   await waitFor(() => {
//     expect(axios.get).toHaveBeenCalledWith(
//       `${env.API_URL}/spoonacular/searchRecipe`,
//       {
//         params: {
//           offset: 0,
//           number: 6,
//           //   maxCalories: 300,
//           //   includeIngredients: "salmon",
//         },
//       }
//     );
//   });
// });

describe("Search Page without passed nutrients /& ingredients", () => {
  vi.mock("react-router-dom", () => ({
    useLocation: () => ({ pathname: "" }),
    useNavigate: () => vi.fn(),
  }));
  const onTagsChangeMock = vi.fn(() => {});

  beforeEach(() => {
    render(<SearchTest />);
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
      screen.getByPlaceholderText("onion, canned tomato, pasta")
    ).toBeTruthy();

    const searchBar_button = screen.getByTestId("searchbar_button");
    // search button is rendered?
    expect(searchBar_button).toBeTruthy();
  });
});
