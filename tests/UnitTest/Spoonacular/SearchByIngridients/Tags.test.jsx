import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tags from "src/components/Cards/Tags/Tags";
import { useNavigate } from "react-router-dom";

const mockUseNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockUseNavigate,
}));

describe("Tags", () => {
  beforeEach(() => {
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
  test("render successfully", async () => {});

  test("tags have button role", async () => {
    expect(screen.getByRole("button").textContent).toBe("Japanese");
    expect(screen.getByRole("button").textContent).toBe("Soup");
    expect(screen.getByRole("button").textContent).toBe("Vegan");
  });

  test("texts are shown", async () => {
    expect(screen.getByRole("button").textContent).toBe("Japanese");
    expect(screen.getByRole("button").textContent).toBe("Soup");
    expect(screen.getByRole("button").textContent).toBe("Vegan");
  });

  test("if disabled is true, then the Modified Button can't be clicked", async () => {
    expect(onClickMock).toHaveBeenCalledTimes(0);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
    await userEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(2);
    const onClickMock = vi.fn(() => {});

    render(
      <ModifiedButton
        title="Test Button"
        disabled={true}
        onClick={onClickMock}
      />
    );

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(0);
    expect(button).toBeDisabled();
  });
});
