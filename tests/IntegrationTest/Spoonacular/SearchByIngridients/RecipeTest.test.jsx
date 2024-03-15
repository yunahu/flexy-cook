// import { describe, test, expect } from "vitest";
// import { render, screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { createMemoryHistory } from "history";
// import { Router } from "react-router-dom";
// import RecipeTest from "src/pages/Recipe/RecipeTest";

// describe("Recipe Page", () => {
//   test("renders without crashing", () => {
//     const history = createMemoryHistory();
//     history.push("/testRecipe", {
//       recipe: {
//         diets: [],
//         analyzedInstructions: [
//           {
//             steps: [
//               {
//                 step: "Boil oil over high heat",
//                 number: 1,
//                 equipment: [],
//               },
//             ],
//           },
//         ],
//       },
//     });

//     render(
//       <Router history={history}>
//         <RecipeTest />
//       </Router>
//     );

//   });
// });
