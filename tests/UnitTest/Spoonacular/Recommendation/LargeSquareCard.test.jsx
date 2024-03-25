import { describe, test, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import LargeSquareCard from "src/components/LargeSquareCard/LargeCard";
import { getTagInfo } from "src/utils/spoonacularFunctions";

const mockUseNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockUseNavigate,
}));

describe("LargeSquareCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("render successfully", async () => {
    render(<LargeSquareCard />);
  });

  test("all information is shown", async () => {
    render(
      <LargeSquareCard
        imgURL="soup.jpg"
        title="Soup"
        ingredients="onion, tomato"
        tags={[
          {
            key: "diet",
            text: "Vegan",
            type: "warning",
          },
          {
            key: "type",
            text: "Breakfast",
            type: "dark",
          },
          {
            key: "cuisine",
            text: "Japanese",
            type: "info",
          },
        ]}
        time="30"
        size="4"
        calories="500"
      />
    );
    // tags are shown?
    expect(screen.getByText("Japanese")).toBeInTheDocument();
    expect(screen.getByText("Breakfast")).toBeInTheDocument();
    expect(screen.getByText("Vegan")).toBeInTheDocument();
    // title is shown?
    expect(screen.getByText("Soup")).toBeInTheDocument();
    // ingredients are shown?
    expect(screen.getByText("onion, tomato")).toBeInTheDocument();
    // recipe info is shown?
    expect(screen.getByText("500 kcal")).toBeInTheDocument();
    expect(screen.getByText("30 minutes")).toBeInTheDocument();
    expect(screen.getByText("4 servings")).toBeInTheDocument();
  });

  test("check it out button is clickable", async () => {
    const onClickMock = vi.fn();
    render(<LargeSquareCard onClick={onClickMock} title="soup" />);
    const button = screen.getByText("Check It Out");
    // have not been called?
    expect(onClickMock).toBeCalledTimes(0);
    await userEvent.click(button);
    // have been called once>
    expect(onClickMock).toBeCalledTimes(1);
  });

  test("tags in the card is clickable & navigates to the search page", async () => {
    const tags = [
      {
        key: "diet",
        text: "Vegan",
        type: "warning",
      },
      {
        key: "type",
        text: "Soup",
        type: "dark",
      },
      {
        key: "cuisine",
        text: "Japanese",
        type: "info",
      },
    ];
    render(
      <LargeSquareCard
        imgURL="soup.jpg"
        title="Soup"
        ingredients="onion, tomato"
        tags={tags}
        time="30"
        size="4"
        calories="500"
      />
    );

    const JPTag = screen.getByText("Japanese");
    // use navigate is not called yet?
    expect(mockUseNavigate).toBeCalledTimes(0);
    await userEvent.click(JPTag);
    // use navigate is not called once?
    expect(mockUseNavigate).toBeCalledTimes(1);
    // navigates "/testSearch" with information?
    expect(mockUseNavigate).toBeCalledWith("/testSearch", {
      state: { tagInfo: getTagInfo(tags[2]) },
    });
  });
});
