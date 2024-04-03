import { describe, test, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tags from "src/components/Cards/Tags/Tags";
import React from "react";
import { getTagInfo } from "src/utils/spoonacularFunctions";

const mockUseNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockUseNavigate,
}));

describe("Tags", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("render successfully", async () => {
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
    render(<Tags tags={tags} />);
  });

  test("the tag has a button role", async () => {
    const tags = [
      {
        key: "diet",
        text: "Vegan",
        type: "warning",
      },
    ];
    render(<Tags tags={tags} />);
    expect(screen.getAllByRole("button")).toBeInTheDocument;
  });

  test("texts are shown", async () => {
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
    render(<Tags tags={tags} />);
    // text are shown?
    expect(screen.getAllByText("Japanese")).toBeInTheDocument;
    expect(screen.getAllByText("Soup")).toBeInTheDocument;
    expect(screen.getAllByText("Vegan")).toBeInTheDocument;
  });

  test("when the tags are clicked, onClick is called", async () => {
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
    render(<Tags tags={tags} />);

    const JPTag = screen.getByText("Japanese");
    // use navigate is not called yet?
    expect(mockUseNavigate).toBeCalledTimes(0);
    await userEvent.click(JPTag);

    // use navigate is not called once?
    expect(mockUseNavigate).toBeCalledTimes(1);
    // navigates "/search" with information?
    expect(mockUseNavigate).toBeCalledWith("/search", {
      state: { tagInfo: getTagInfo(tags[2]) },
    });
  });
});
