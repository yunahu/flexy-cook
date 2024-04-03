import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdvancedSearchMenu from "src/pages/Search/components/AdvancedSearch/AdvancedSearch";

vi.mock("react-router-dom", () => ({
  useLocation: () => ({ pathname: "" }),
}));

describe("Advanced Search", () => {
  const onTagsChangeMock = vi.fn(() => {});

  beforeEach(() => {
    render(<AdvancedSearchMenu onTagsChange={onTagsChangeMock} />);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("render with dropdown button & area is not expanded", async () => {
    // button is rendered?
    expect(screen.getByRole("button")).toBeTruthy();

    // menu is not expanded?
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  test("dropdown menu is expanded when the user user clicks the dropdown button", async () => {
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
    expect(addTagButton).toBeDisabled();
    await userEvent.type(screen.getByLabelText("Nutrient amount"), "10");
    // addTagButton is disabled?
    expect(addTagButton).toBeDisabled();
    await userEvent.selectOptions(screen.getByLabelText("MinOrMax"), "Min");
    // addTagButton is disabled?
    expect(addTagButton).toBeDisabled();
    await userEvent.selectOptions(screen.getByLabelText("Nutrient"), "Fat");

    // addTagButton is not disabled?
    await waitFor(() => expect(addTagButton).toBeEnabled());
  });

  test("the scale of tht nutrient amount will be changed based on the nutrient", async () => {
    // menu is not expanded?
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");

    userEvent.click(button);
    // menu is expanded?
    await waitFor(() =>
      expect(button).toHaveAttribute("aria-expanded", "true")
    );

    const amountForm = screen.getByLabelText("Nutrient amount");
    const nutrientOptions = screen.getByLabelText("Nutrient");

    // scale is g?
    userEvent.selectOptions(nutrientOptions, "Fat");
    await waitFor(() => expect(screen.getByText("g")).toBeInTheDocument());
    // scale is μg?
    userEvent.selectOptions(nutrientOptions, "Folate");
    await waitFor(() => expect(screen.getByText("μg")).toBeInTheDocument());
    // scale is mg?
    userEvent.selectOptions(nutrientOptions, "Iron");
    await waitFor(() => expect(screen.getByText("mg")).toBeInTheDocument());
    // scale is kcal?
    userEvent.selectOptions(nutrientOptions, "Calories");
    await waitFor(() => expect(screen.getByText("kcal")).toBeInTheDocument());
  });

  test("if the amount is invalid, then alert to the user & let the users to not make invalid tags", async () => {
    window.alert = vi.fn(() => {});
    // alert is not called?
    expect(window.alert).toHaveBeenCalledTimes(0);

    // menu is not expanded?
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");

    userEvent.click(button);
    // menu is expanded?
    await waitFor(() =>
      expect(button).toHaveAttribute("aria-expanded", "true")
    );

    const amountForm = screen.getByLabelText("Nutrient amount");
    const rangeOptions = screen.getByLabelText("MinOrMax");
    const nutrientOptions = screen.getByLabelText("Nutrient");
    const addTagButton = screen.getByText("+");

    userEvent.selectOptions(nutrientOptions, "Fat");
    userEvent.selectOptions(rangeOptions, "Max");
    // the button is disabled?
    await waitFor(() => expect(addTagButton).toBeDisabled());

    await userEvent.type(amountForm, "-");
    await waitFor(() =>
      // alert is shown?
      expect(window.alert).toHaveBeenCalledWith("Please enter a valid amount")
    );
    // alert was called?
    expect(window.alert).toHaveBeenCalledTimes(1);
    // the button is disabled?
    await waitFor(() => expect(addTagButton).toBeDisabled());

    amountForm.value = "";
    await userEvent.type(amountForm, "a");
    await waitFor(() =>
      // alert is shown?
      expect(window.alert).toHaveBeenCalledWith("Please enter a valid amount")
    );
    // alert was called?
    expect(window.alert).toHaveBeenCalledTimes(2);
    // the button is disabled?
    await waitFor(() => expect(addTagButton).toBeDisabled());

    amountForm.value = "";
    await userEvent.type(amountForm, "100001");
    console.log(amountForm.value);
    await waitFor(() =>
      // alert is shown?
      expect(window.alert).toHaveBeenCalledWith("Please enter a valid amount")
    );
    // alert was called?
    expect(window.alert).toHaveBeenCalledTimes(3);
    amountForm.value = "";

    await userEvent.type(amountForm, "10");
    // the button is enabled?
    await waitFor(() => expect(addTagButton).toBeEnabled());
    // alert was not called?
    expect(window.alert).toHaveBeenCalledTimes(3);
  });

  test("when the tag is added, then information that the user typed is shown as a tag", async () => {
    // menu is not expanded?
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");

    userEvent.click(button);
    // menu is expanded?
    await waitFor(() =>
      expect(button).toHaveAttribute("aria-expanded", "true")
    );

    const addTagButton = screen.getByText("+");

    await userEvent.type(screen.getByLabelText("Nutrient amount"), "10");
    userEvent.selectOptions(screen.getByLabelText("MinOrMax"), "Min");
    userEvent.selectOptions(screen.getByLabelText("Nutrient"), "Fat");
    await waitFor(() => expect(addTagButton).toBeEnabled());
    userEvent.click(addTagButton);

    await waitFor(() =>
      // tag information is shown?
      expect(screen.getByText("Min Fat 10(g)")).toBeInTheDocument()
    );
  });

  test("when the user click the close button on the tag, the tag will be deleted", async () => {
    // menu is not expanded?
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");

    userEvent.click(button);
    // menu is expanded?
    await waitFor(() =>
      expect(button).toHaveAttribute("aria-expanded", "true")
    );

    const addTagButton = screen.getByText("+");

    await userEvent.type(screen.getByLabelText("Nutrient amount"), "10");
    userEvent.selectOptions(screen.getByLabelText("MinOrMax"), "Min");
    userEvent.selectOptions(screen.getByLabelText("Nutrient"), "Fat");
    waitFor(() => expect(addTagButton).toBeEnabled());
    userEvent.click(addTagButton);

    await waitFor(() =>
      // tag information is shown?
      expect(screen.getByText("Min Fat 10(g)")).toBeInTheDocument()
    );

    const closeButton = screen.getByRole("button", { name: "Close" });
    window.confirm = vi.fn().mockImplementation(() => true);
    userEvent.click(closeButton);
    // confirmation has been shown?
    await waitFor(() => expect(window.confirm).toHaveBeenCalled());
    await waitFor(() =>
      // tag information is not shown?
      expect(screen.queryByText("Min Fat 10(g)")).not.toBeInTheDocument()
    );
  });

  test("the can add as many tags as they want, and all of them will be shown", async () => {
    // menu is not expanded?
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");

    userEvent.click(button);
    // menu is expanded?
    await waitFor(() =>
      expect(button).toHaveAttribute("aria-expanded", "true")
    );

    const amountForm = screen.getByLabelText("Nutrient amount");
    const rangeOptions = screen.getByLabelText("MinOrMax");
    const nutrientOptions = screen.getByLabelText("Nutrient");
    const addTagButton = screen.getByText("+");

    await userEvent.type(amountForm, "10");
    userEvent.selectOptions(rangeOptions, "Min");
    userEvent.selectOptions(nutrientOptions, "Fat");
    waitFor(() => expect(addTagButton).toBeEnabled());
    userEvent.click(addTagButton);

    await userEvent.type(amountForm, "50");
    userEvent.selectOptions(rangeOptions, "Max");
    userEvent.selectOptions(nutrientOptions, "Protein");
    waitFor(() => expect(addTagButton).toBeEnabled());
    userEvent.click(addTagButton);

    await userEvent.type(amountForm, "300");
    userEvent.selectOptions(rangeOptions, "Max");
    userEvent.selectOptions(nutrientOptions, "Calories");
    waitFor(() => expect(addTagButton).toBeEnabled());
    userEvent.click(addTagButton);

    await waitFor(
      () =>
        // all tag information is shown?
        expect(screen.getByText("Max Calories 300(kcal)")).toBeInTheDocument(),
      expect(screen.getByText("Max Protein 50(g)")).toBeInTheDocument(),
      expect(screen.getByText("Min Fat 10(g)")).toBeInTheDocument()
    );
  });

  test("when the user try to make tags that have the same nutrient & range, then alert to user that is not possible & let the users not make the duplicate tag", async () => {
    window.alert = vi.fn(() => {});
    // alert is not called?
    expect(window.alert).toHaveBeenCalledTimes(0);

    // menu is not expanded?
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");

    userEvent.click(button);

    // menu is expanded?
    await waitFor(() =>
      expect(button).toHaveAttribute("aria-expanded", "true")
    );

    const amountForm = screen.getByLabelText("Nutrient amount");
    const rangeOptions = screen.getByLabelText("MinOrMax");
    const nutrientOptions = screen.getByLabelText("Nutrient");
    const addTagButton = screen.getByText("+");

    await userEvent.type(amountForm, "10");
    userEvent.selectOptions(rangeOptions, "Min");
    userEvent.selectOptions(nutrientOptions, "Fat");
    waitFor(() => expect(addTagButton).toBeEnabled());
    userEvent.click(addTagButton);

    await waitFor(() =>
      // tag information is shown?
      expect(screen.getByText("Min Fat 10(g)")).toBeInTheDocument()
    );

    await userEvent.type(amountForm, "50");
    userEvent.selectOptions(rangeOptions, "Min");
    userEvent.selectOptions(nutrientOptions, "Fat");
    waitFor(() => expect(addTagButton).toBeEnabled());
    userEvent.click(addTagButton);

    await waitFor(() =>
      // alert is shown?
      expect(window.alert).toHaveBeenCalledWith(
        "The same combination of nutrients and range tag exists."
      )
    );
    // alert was called?
    expect(window.alert).toHaveBeenCalledTimes(1);

    await waitFor(
      () =>
        // only the first tag is shown?
        expect(screen.getByText("Min Fat 10(g)")).toBeInTheDocument(),
      expect(screen.queryByText("Min Fat 50(g)")).not.toBeInTheDocument()
    );
  });

  test("when add tag, onTagsChange will be called", async () => {
    // onTagsChange is not called?
    expect(onTagsChangeMock).toHaveBeenCalledTimes(0);

    // menu is not expanded?
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");

    userEvent.click(button);

    // menu is expanded?
    await waitFor(() =>
      expect(button).toHaveAttribute("aria-expanded", "true")
    );

    const amountForm = screen.getByLabelText("Nutrient amount");
    const rangeOptions = screen.getByLabelText("MinOrMax");
    const nutrientOptions = screen.getByLabelText("Nutrient");
    const addTagButton = screen.getByText("+");

    await userEvent.type(amountForm, "10");
    userEvent.selectOptions(rangeOptions, "Min");
    userEvent.selectOptions(nutrientOptions, "Fat");
    waitFor(() => expect(addTagButton).toBeEnabled());
    userEvent.click(addTagButton);

    await waitFor(() =>
      // tag information is shown?
      expect(screen.getByText("Min Fat 10(g)")).toBeInTheDocument()
    );

    // onTagsChange is not called?
    expect(onTagsChangeMock).toHaveBeenCalledTimes(1);
  });
});

// findBy <- with await, throw error when it's not found
// getBy <- without await, throw error when it's not found
// queryBy, return null when it's not found
