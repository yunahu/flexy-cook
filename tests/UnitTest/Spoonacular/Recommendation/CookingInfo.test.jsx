import { describe, test, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import CookingInfo from "src/components/Cards/CookingInfo/CookingInfo";

describe("CookingInfo", () => {
  test("the element is successfully rendered", async () => {
    render(<CookingInfo />);
  });

  test("info scales will be shown when render", async () => {
    render(<CookingInfo />);
    expect(screen.getByText("kcal")).toBeTruthy();
    expect(screen.getByText("minutes")).toBeTruthy();
    expect(screen.getByText("serving")).toBeTruthy();
  });

  test("when the props are passed, they are shown", async () => {
    render(<CookingInfo size="3" time="45" calories="300" />);
    expect(screen.getByText("300 kcal")).toBeTruthy();
    expect(screen.getByText("45 minutes")).toBeTruthy();
    expect(screen.getByText("3 servings")).toBeTruthy();
  });

  test("when the size is 1, then show serving instead of servings", async () => {
    render(<CookingInfo size="1" time="45" calories="300" />);
    expect(screen.getByText("1 serving")).toBeTruthy();
  });
});
