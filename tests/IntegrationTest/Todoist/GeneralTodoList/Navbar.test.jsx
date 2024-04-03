import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { TodoListsContext } from "src/App";
import { TODOIST_BASE_URL } from "src/services/todoist";
import TodoistProjectsMock from "../../../mocks/Todoist/TodoistProjectsMock.json";
import TodoistSectionsMock from "../../../mocks/Todoist/TodoistSectionsMock.json";
import Navbar from "src/components/Navbar/Navbar";
import { MemoryRouter } from "react-router-dom";

const server = setupServer(
  http.get(`${TODOIST_BASE_URL}/projects`, () =>
    HttpResponse.json(TodoistProjectsMock)
  ),
  http.get(`${TODOIST_BASE_URL}/sections`, () =>
    HttpResponse.json(TodoistSectionsMock)
  )
);

let todoLists = [];
const setTodoLists = (x) => {
  todoLists = x;
};
const providerProps = { value: { todoLists, setTodoLists } };

const customRender = (ui, renderOptions) => {
  const mockRoute = "/home";

  return render(
    <MemoryRouter initialEntries={[mockRoute]}>
      <TodoListsContext.Provider {...providerProps}>
        {ui}
      </TodoListsContext.Provider>
    </MemoryRouter>,
    renderOptions
  );
};

beforeAll(() => {
  localStorage.setItem("todoistToken", "TEST_TOKEN");
  server.listen({ onUnhandledRequest: "error" });
});

afterAll(() => {
  localStorage.removeItem("todoistToken");
  server.close();
});

afterEach(() => server.resetHandlers());

beforeEach(async () => setTodoLists([]));

describe("Navbar", () => {
  test("should render the Navbar", async () => {
    const result = customRender(<Navbar />);
    expect(result).toBeTruthy();
  });

  test("'Add New Memo' button should trigger the TodoListsModal to be rendered", async () => {
    const result = customRender(<Navbar />);
    const TODObutton = result.container.querySelector("#TODObutton");
    fireEvent.click(TODObutton);
    const addNewMemoButton = result.container.querySelector("#addNewMemo");
    fireEvent.click(addNewMemoButton);
    await waitFor(() =>
      expect(document.querySelector("#todoListsModal")).toBeInTheDocument()
    );
  });
});
