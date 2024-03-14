import { describe, test, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdvancedSearchMenu from "src/pages/Search/components/AdvancedSearch/AdvancedSearch";

describe("Advanced Search", () => {
  test("render with dropdown button & area is not expanded", async () => {
    render(<AdvancedSearchMenu />);

    // button is rendered?
    expect(screen.getByRole("button")).toBeTruthy();

    // menu is not expanded?
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  test("dropdown menu is expanded when the user user clicks the dropdown button", async () => {
    render(<AdvancedSearchMenu />);

    const button = screen.getByRole("button");
    // menu is not expanded?
    expect(button).toHaveAttribute("aria-expanded", "false");

    userEvent.click(button);
    // menu is expanded?
    await waitFor(() =>
      expect(button).toHaveAttribute("aria-expanded", "true")
    );

    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  test("when the dropdown menu is expanded, render all required components", async () => {
    render(<AdvancedSearchMenu />);

    // menu is not expanded?
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");

    userEvent.click(button);
    // menu is expanded?
    await waitFor(() =>
      expect(button).toHaveAttribute("aria-expanded", "true")
    );

    // all required components are rendered?
    expect(screen.getByLabelText("Nutrient amount")).toBeTruthy();
    expect(screen.getByLabelText("MinOrMax")).toBeTruthy();
    expect(screen.getByLabelText("Nutrient")).toBeTruthy();
    expect(screen.getByText("+")).toBeTruthy();
  });

  test("when the dropdown menu is expanded, render all required components", async () => {
    render(<AdvancedSearchMenu />);

    // menu is not expanded?
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");

    userEvent.click(button);
    // menu is expanded?
    await waitFor(() =>
      expect(button).toHaveAttribute("aria-expanded", "true")
    );

    // all required components are rendered?
    expect(screen.getByLabelText("Nutrient amount")).toBeTruthy();
    expect(screen.getByLabelText("MinOrMax")).toBeTruthy();
    expect(screen.getByLabelText("Nutrient")).toBeTruthy();
    expect(screen.getByText("+")).toBeTruthy();
  });

  test("until all values filled, disable add tag button", async () => {
    render(<AdvancedSearchMenu />);

    // menu is not expanded?
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");

    userEvent.click(button);
    // menu is expanded?
    await waitFor(() =>
      expect(button).toHaveAttribute("aria-expanded", "true")
    );

    const addTagButton = screen.getByText("+");

    // addTagButton is disabled?
    expect(addTagButton).toHaveAttribute("disabled", "true");
    userEvent.type(screen.getByLabelText("Nutrient amount"), "10");
    // addTagButton is disabled?
    expect(addTagButton).toBeDisabled();
    userEvent.selectOptions(screen.getByLabelText("MinOrMax"), "Min");
    // addTagButton is disabled?
    expect(addTagButton).toBeDisabled();
    userEvent.selectOptions(screen.getByLabelText("Nutrient"), "Fat");

    // addTagButton is not disabled?
    expect(addTagButton).toHaveAttribute("disabled", "false");
  });
  test("until all values filled, disable add tag button", async () => {
    render(<AdvancedSearchMenu />);

    // menu is not expanded?
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");

    userEvent.click(button);
    // menu is expanded?
    await waitFor(() =>
      expect(button).toHaveAttribute("aria-expanded", "true")
    );
});
