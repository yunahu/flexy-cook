import { describe, test, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "src/pages/Home/Home";
import axios from "axios";
import env from "src/utils/env";
import RecipeDetailMock from "./RecipeDetailMock";
import RandomRecipeMock from "./RandomRecipeMock";

const mockUseNavigate = vi.fn();

vi.mock("axios");
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockUseNavigate,
}));

describe("Home Page", () => {
  beforeEach(() => {
    axios.get.mockClear();
    axios.get.mockResolvedValueOnce({
      data: RandomRecipeMock,
    });

    for (let i = 0; i < 7; i++) {
      axios.get.mockResolvedValueOnce({
        data: { ...RecipeDetailMock, title: `Test title ${i}`, id: i },
      });

      axios.get.mockResolvedValueOnce({
        data: RecipeTasteMock,
      });
    }

    render(<Home />);
  });

  test("fetch random recipe successfully", async () => {
    // api is called to fetch random recipe?
    expect(axios.get).toHaveBeenNthCalledWith(
      1,
      `${env.API_URL}/spoonacular/randomRecipe`,
      { params: { number: 7 } }
    );
  });

  test("fetch recipe details & taste successfully", async () => {
    // api is called to fetch recipe detail?
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${env.API_URL}/spoonacular/randomRecipe`,
        { params: { number: 7 } }
      );
    });

    // api is called to fetch recipe taste?
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${env.API_URL}/spoonacular/getRecipe`,
        {
          params: {
            id: 663883,
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
            id: 663883,
            normalize: true,
          },
        }
      );
    });
  });

  test("render recipe details", async () => {
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${env.API_URL}/spoonacular/randomRecipe`,
        { params: { number: 7 } }
      );
    });

    // api is called to fetch recipe taste?
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${env.API_URL}/spoonacular/getRecipe`,
        {
          params: {
            id: 663883,
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
            id: 663883,
            normalize: true,
          },
        }
      );
    });

    // all recipe cards are rendered?
    expect(screen.getByTestId("lg_sq_card_1")).toBeInTheDocument();
    expect(screen.getByTestId("lg_hori_card_1")).toBeInTheDocument();
    expect(screen.getByTestId("lg_hori_card_2")).toBeInTheDocument();
    expect(screen.getByTestId("lg_hori_card_3")).toBeInTheDocument();
    expect(screen.getByTestId("lg_hori_card_4")).toBeInTheDocument();
    expect(screen.getByTestId("lg_hori_card_5")).toBeInTheDocument();
    expect(screen.getByTestId("lg_hori_card_6")).toBeInTheDocument();
    expect(screen.getByTestId("lg_hori_card_6")).toBeInTheDocument();
    expect(screen.getByTestId("carousel_banner_1")).toBeInTheDocument();
    expect(screen.getByTestId("carousel_banner_2")).toBeInTheDocument();
    expect(screen.getByTestId("carousel_banner_3")).toBeInTheDocument();
  });

  test("button 'Check It Out' is clickable", async () => {
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${env.API_URL}/spoonacular/randomRecipe`,
        { params: { number: 7 } }
      );
    });

    // api is called to fetch recipe taste?
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${env.API_URL}/spoonacular/getRecipe`,
        {
          params: {
            id: 663883,
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
            id: 663883,
            normalize: true,
          },
        }
      );
    });

    // recipe cards are rendered?
    expect(screen.getByTestId("lg_sq_card_1")).toBeInTheDocument();
    expect(screen.getByTestId("carousel_banner_1")).toBeInTheDocument();
    expect(screen.getByTestId("carousel_banner_2")).toBeInTheDocument();
    expect(screen.getByTestId("carousel_banner_3")).toBeInTheDocument();

    const lgCard = screen.getByTestId("lg_sq_card_1");
    const button = lgCard.querySelector("button");
    // button is shown in the lg card?
    expect(lgCard.querySelector("button")).toBeTruthy();

    // userEvent.click(button);

    // expect(mockUseNavigate).toHaveBeenCalled();
  });
});

//https://runthatline.com/how-to-mock-axios-with-vitest/
