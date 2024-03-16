import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "src/components/SearchBar/SearchBar";

describe("SearchBar", async () => {
  test("renders input field and button", () => {
    render(<SearchBar />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("button title will be shown in the button when render", () => {
    render(<SearchBar btnText="Test" />);
    expect(screen.getByText("Test")).toBeTruthy();
  });

  test("The text will be shown as a placeholder when render", () => {
    render(<SearchBar text="test" />);
    expect(screen.getByPlaceholderText("test")).toBeInTheDocument();
  });

  test("when the user types into the search bar or delete text in the search bar, onChange should be called", async () => {
    const onChangeMock = vi.fn(() => {});
    render(<SearchBar onChange={onChangeMock} />);

    expect(onChangeMock).toHaveBeenCalledTimes(0);
    await userEvent.type(screen.getByRole("textbox"), "onion");
    expect(onChangeMock).toHaveBeenCalledTimes(5);
    await userEvent.type(screen.getByRole("textbox"), "cream");
    expect(onChangeMock).toHaveBeenCalledTimes(10);
  });

  test("when the user types into the search bar, value should be the string that the user entered", async () => {
    const onChangeMock = vi.fn(() => {});

    render(<SearchBar onChange={onChangeMock} />);

    await userEvent.type(screen.getByRole("textbox"), "onion, cream");
    expect(screen.getByRole("textbox")).toHaveValue("onion, cream");
  });

  test("when the user click the button, onClick should be called", async () => {
    const onClickMock = vi.fn(() => {});

    render(<SearchBar btnClick={onClickMock} />);

    expect(onClickMock).toHaveBeenCalledTimes(0);
    await userEvent.click(screen.getByRole("button"));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
