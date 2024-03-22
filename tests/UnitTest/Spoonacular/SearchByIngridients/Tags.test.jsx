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
  beforeEach(() => {});
  test("render successfully", async () => {
    render(<Tags />);
  });

  test("tag has button role", async () => {
    render(<ModifiedButton title="Test Button" />);

    expect(screen.getByRole("button").textContent).toBe("Test Button");
  });

  test("when click the ModifiedButton, onClick() should be run", async () => {
    const onClickMock = vi.fn(() => {});

    render(<ModifiedButton onClick={onClickMock} title="Test Button" />);

    expect(onClickMock).toHaveBeenCalledTimes(0);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
    await userEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(2);
  });

  test("if disabled is true, then the Modified Button can't be clicked", async () => {
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
