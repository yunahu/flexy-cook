import { describe, test, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomeTest from "src/pages/Home/HomeTest";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

vi.mock("axios");

describe("Home Page", () => {
  test("render successfully", async () => {
    const { getByText } = render(
      <BrowserRouter>
        <HomeTest />
      </BrowserRouter>
    );
    console.log(document.body.innerHTML);
  });

  test("fetch recipe data successfully", async () => {
    const recipeMock = [
      {
        cuisines: [("Mediterranean", "Italian", "European")],
        dairyFree: true,
        diets: ["dairy free"],
        dishTypes: [("lunch", "main course", "main dish", "dinner")],
        glutenFree: false,
        id: 654614,
        image: "https://spoonacular.com/recipeImages/654614-556x370.jpg",
        readyInMinutes: 45,
        servings: 4,
        title: "Pappa Al Pomodoro",
        vegan: false,
        vegetarian: false,
        veryHealthy: true,
        veryPopular: false,
        extendedIngredients: [{ name: "olive oil" }, { name: "garlic cloves" }],
      },
      {},
    ];

    axios.get.mockResolvedValue({
      data: recipeMock,
    });

    // api called?
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
  });

  test("fetch random recipe successfully", async () => {
    const recipeMock = [
      {
        cuisines: [("Mediterranean", "Italian", "European")],
        dairyFree: true,
        diets: ["dairy free"],
        dishTypes: [("lunch", "main course", "main dish", "dinner")],
        glutenFree: false,
        id: 654614,
        image: "https://spoonacular.com/recipeImages/654614-556x370.jpg",
        readyInMinutes: 45,
        servings: 4,
        title: "Pappa Al Pomodoro",
        vegan: false,
        vegetarian: false,
        veryHealthy: true,
        veryPopular: false,
        extendedIngredients: [{ name: "olive oil" }, { name: "garlic cloves" }],
      },
      {},
    ];

    axios.get.mockResolvedValue({
      data: recipeMock,
    });

    // api called to fetch random recipe?
    expect(axios.get).toHaveBeenNthCalledWith(
      1,
      `${env.API_URL}//spoonacular/randomRecipe`,
      { params: { number: 7 } }
    );
  });

  //   test("fetch recipe details successfully", async () => {
  //     const recipeMock = [
  //       {
  //         cuisines: [("Mediterranean", "Italian", "European")],
  //         dairyFree: true,
  //         diets: ["dairy free"],
  //         dishTypes: [("lunch", "main course", "main dish", "dinner")],
  //         glutenFree: false,
  //         id: 654614,
  //         image: "https://spoonacular.com/recipeImages/654614-556x370.jpg",
  //         readyInMinutes: 45,
  //         servings: 4,
  //         title: "Pappa Al Pomodoro",
  //         vegan: false,
  //         vegetarian: false,
  //         veryHealthy: true,
  //         veryPopular: false,
  //         extendedIngredients: [{ name: "olive oil" }, { name: "garlic cloves" }],
  //       },
  //       {},
  //     ];

  //     const detailMock = [
  //       {
  //         cuisines: [("Mediterranean", "Italian", "European")],
  //         dairyFree: true,
  //         diets: ["dairy free"],
  //         dishTypes: [("lunch", "main course", "main dish", "dinner")],
  //         glutenFree: false,
  //         id: 654614,
  //         image: "https://spoonacular.com/recipeImages/654614-556x370.jpg",
  //         readyInMinutes: 45,
  //         servings: 4,
  //         title: "Pappa Al Pomodoro",
  //         vegan: false,
  //         vegetarian: false,
  //         veryHealthy: true,
  //         veryPopular: false,
  //         extendedIngredients: [{ name: "olive oil" }, { name: "garlic cloves" }],
  //       },
  //     ];

  //     axios.get
  //       .mockResolvedValueOnce({
  //         data: recipeMock,
  //       })
  //       .mockResolvedValueOnce({
  //         data: detailMock,
  //       });

  //     await waitFor(() => {
  //       console.log("Random Recipe Axios call:", axios.get.mock.calls[0]);
  //       expect(axios.get).toHaveBeenCalledWith(
  //         `${env.API_URL}//spoonacular/randomRecipe`,
  //         { params: { number: 7 } }
  //       );
  //     });

  //     await waitFor(() => {
  //       console.log("Random Recipe Axios call:", axios.get.mock.calls[1]);
  //       expect(axios.get).toHaveBeenCalledWith(
  //         `${env.API_URL}//spoonacular/getRecipe`,
  //         { params: { id: 654614, includeNutrition: true } }
  //       );
  //     });
  //   });

  // expect(axios.get).toHaveBeenNthCalledWith(
  //   1,
  //   `${env.API_URL}//spoonacular/randomRecipe`,
  //   { params: { number: 7 } }
  // );
  // await waitFor(() =>
  //   expect(axios.get).toHaveBeenNthCalledWith(
  //     2,
  //     `${env.API_URL}//spoonacular/getRecipe`,
  //     { params: { id: 654614, includeNutrition: true } }
  //   )
  // );

  // await waitFor(() =>
  //   expect(axios.get).toHaveBeenNthCalledWith(
  //     3,
  //     `${env.API_URL}//spoonacular/getRecipeTaste,
  //     { params: { id: 654614, normalize: true } }
  //   )
  // );
});

//https://runthatline.com/how-to-mock-axios-with-vitest/
