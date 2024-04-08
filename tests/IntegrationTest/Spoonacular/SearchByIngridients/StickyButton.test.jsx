import StickyButton from "src/components/StickyButton/StickyButton";
import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("StickyButton", () => {
  beforeEach(() => {
    global.scrollTo = vi.fn((options) => {
      global.scrollY = options.top;
    });
  });

  afterEach(() => {
    global.scrollTo.mockRestore();
    global.scrollY = 0;
  });

  test("StickyButton rendered successfully", async () => {
    render(<StickyButton />);
  });

  test("Sticky button shows up only when the user scroll more then 200", async () => {
    render(<StickyButton />);
    fireEvent.scroll(window, { target: { scrollY: 200 } });
    // "Back to Top not shown?"
    expect(screen.queryByText("Back to Top")).not.toBeInTheDocument();

    fireEvent.scroll(window, { target: { scrollY: 201 } });
    // "Back to Top shown?"
    expect(screen.queryByText("Back to Top")).toBeInTheDocument();
  });

  test("After navigate to the top, the button is invisible again", async () => {
    render(<StickyButton />);
    fireEvent.scroll(window, { target: { scrollY: 300 } });
    const btn = screen.getByTestId("sticky_button");
    userEvent.click(btn);
    // move to top?
    await waitFor(() => {
      expect(window.scrollY).toBe(0);
    });
  });

  test("when sticky button is clicked, navigate top", async () => {
    render(<StickyButton />);
    fireEvent.scroll(window, { target: { scrollY: 300 } });
    const btn = screen.getByTestId("sticky_button");
    userEvent.click(btn);
    // move to top?
    await waitFor(() => {
      expect(window.scrollY).toBe(0);
    });
  });
});
