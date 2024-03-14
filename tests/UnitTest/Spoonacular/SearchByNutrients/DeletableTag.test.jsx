import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeletableTag from "src/pages/Search/components/DeletableTag/DeletableTag";

describe("ModifiedButton", () => {
  test("range, nutrient, amount, and scale should be shown when render", () => {
    render(
      <DeletableTag
        minOrMax="Min"
        nutrient="Fat"
        amount="30"
        scale="g"
      ></DeletableTag>
    );
    expect(screen.getByText(/Min/)).toBeInTheDocument();
    expect(screen.getByText(/Fat/)).toBeInTheDocument();
    expect(screen.getByText(/30/)).toBeInTheDocument();
    expect(screen.getByText(/g/)).toBeInTheDocument();
  });

  test("when click the Close Button, onClick() should be run", async () => {
    const onClickMock = vi.fn(() => {});

    render(
      <DeletableTag
        onClick={onClickMock}
        minOrMax="Min"
        nutrient="Fat"
        amount="30"
        scale="g"
      ></DeletableTag>
    );

    expect(onClickMock).toHaveBeenCalledTimes(0);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
    await userEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(2);
  });
});
