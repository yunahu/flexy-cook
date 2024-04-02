import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Navbar from "src/components/Navbar/Navbar";

const mockUseNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockUseNavigate,
}));

describe("NavBar", () => {
  test("render successfully", async () => {
    render(<Navbar />);
  });
});
