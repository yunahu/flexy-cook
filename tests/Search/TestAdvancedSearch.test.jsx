import { describe, it, expect } from "vitest";
import AdvancedSearchMenu from "src/pages/Search/components/AdvancedSearch/AdvancedSearch.jsx";

describe("calls deleteTag when a DeletableTag is clicked", () => {
  const deleteTag = jest.fn();
  const tags = [
    { amount: "10", nutrient: "protein", minOrMax: "min", scale: "g" },
    // Add more tags as needed
  ];

  const { getAllByRole } = render(
    <AdvancedSearchMenu tags={tags} deleteTag={deleteTag} />
  );

  const buttons = getAllByRole("button");
  fireEvent.click(buttons[0]);

  expect(deleteTag).toHaveBeenCalledWith(0);
});
