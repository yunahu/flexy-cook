import { describe, test, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomeTest from "src/pages/Home/HomeTest";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import env from "src/utils/env";
import RecipeDetailMock from "./RecipeDetailMock";
import RandomRecipeMock from "./RandomRecipeMock";
import RecipeTasteMock from "./RecipeTasteMock";

vi.mock("axios");

describe("Home Page", () => {
  beforeEach(() => {
    axios.get.mockClear();
    axios.get.mockResolvedValueOnce({
      data: RandomRecipeMock,
    });

    for (let i = 0; i < 7; i++) {
      axios.get.mockResolvedValueOnce({
        data: RecipeDetailMock,
      });

      axios.get.mockResolvedValueOnce({
        data: RecipeTasteMock,
      });
    }

    render(
      <BrowserRouter>
        <HomeTest />
      </BrowserRouter>
    );
  });

  test("fetch random recipe successfully", async () => {
    // api called to fetch random recipe?
    expect(axios.get).toHaveBeenNthCalledWith(
      1,
      `${env.API_URL}/spoonacular/randomRecipe`,
      { params: { number: 7 } }
    );
  });

  test("fetch recipe details successfully", async () => {
    await waitFor(() => {
      console.log("Random Recipe Axios call:", axios.get.mock.calls[0]);
      expect(axios.get).toHaveBeenCalledWith(
        `${env.API_URL}/spoonacular/randomRecipe`,
        { params: { number: 7 } }
      );
    });

    await waitFor(() => {
      console.log("Random Recipe Axios call:", axios.get.mock.calls[1]);
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
      console.log("Random Recipe Axios call:", axios.get.mock.calls[1]);
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
  });

  // expect(axios.get).toHaveBeenNthCalledWith(
  //   1,
  //   `${env.API_URL}/spoonacular/randomRecipe`,
  //   { params: { number: 7 } }
  // );

  // waitFor(() =>
  //   expect(axios.get).toHaveBeenNthCalledWith(
  //     2,
  //     `${env.API_URL}/spoonacular/getRecipe`,
  //     { params: { id: 654614, includeNutrition: true } }
  //   )
  // );

  // waitFor(() =>
  //   expect(axios.get).toHaveBeenNthCalledWith(
  //     3,
  //     `${env.API_URL}/spoonacular/getRecipeTaste`,
  //     { params: { id: 654614, normalize: true } }
  //   )
  // );
});

//https://runthatline.com/how-to-mock-axios-with-vitest/
