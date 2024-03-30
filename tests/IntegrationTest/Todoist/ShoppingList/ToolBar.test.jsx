import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import ToolBar from "src/pages/Recipe/components/ToolBar/ToolBar";
import { TodoListsContext } from "src/App";
import { TODOIST_BASE_URL } from "src/services/todoist";
import TodoistProjectsMock from "../../../mocks/TodoistProjectsMock.json";
import TodoistSectionsMock from "../../../mocks/TodoistSectionsMock.json";
import GetRecipeMock from "../../../mocks/GetRecipeMock.json";

vi.stubGlobal("alert", () => {});
const alertMock = vi.spyOn(window, 'alert').mockImplementation(); 

const TodoistShoppingListSection = TodoistSectionsMock.find(section => section.name === "Shopping List");
const addedTasks = [];

const server = setupServer(
	http.get(`${TODOIST_BASE_URL}/projects`, () => HttpResponse.json(TodoistProjectsMock)),
	http.get(`${TODOIST_BASE_URL}/sections`, () => HttpResponse.json(TodoistSectionsMock)),
	http.post(`${TODOIST_BASE_URL}/sections`, () => HttpResponse.json(TodoistShoppingListSection)),
	http.post(`${TODOIST_BASE_URL}/tasks`, async ({ request }) => {
		const data = await request.json();
		addedTasks.push(data);
		return new HttpResponse();
	}),
);

let todoLists = [];
const setTodoLists = x => { todoLists = x };
const providerProps = { value: { todoLists, setTodoLists } };

const customRender = (ui, renderOptions ) => {
  return render(
    <TodoListsContext.Provider {...providerProps}>{ui}</TodoListsContext.Provider>,
    renderOptions,
  );
};

beforeAll(() => {
	localStorage.setItem("todoistToken", "TEST_TOKEN");
	server.listen({ onUnhandledRequest: 'error' });
});

afterAll(() => { 
	localStorage.removeItem("todoistToken");
	server.close();
});

afterEach(() => server.resetHandlers());

beforeEach(async () => setTodoLists([]));

describe("Toolbar", () => {
  test("should render the 'add to shopping list' button", async () => {
		const result = customRender(<ToolBar recipe={GetRecipeMock} />);
		const button = result.container.querySelector('#add-to-shopping-list-button');

		expect(button).toBeTruthy();
  });

	test("'add to shopping list' button should add the ingredients as tasks in the shopping list section", async () => {
		const expected_tasks = GetRecipeMock.extendedIngredients.map(ingredient => ({
			content: `${ingredient.name} - ${ingredient.measures.metric.amount} ${ingredient.measures.metric.unitLong}`,
			project_id: null,
			section_id: TodoistShoppingListSection.id
		}));

		const result = customRender(<ToolBar recipe={GetRecipeMock} />);
		const button = result.container.querySelector('#add-to-shopping-list-button');
		fireEvent.click(button);
		await waitFor(() => expect(alertMock).toBeCalledWith("Success"));

		expect(addedTasks).toEqual(expected_tasks);
	});
});