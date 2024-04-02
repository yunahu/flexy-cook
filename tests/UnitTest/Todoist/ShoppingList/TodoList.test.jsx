import { describe, test, expect, afterEach } from "vitest";
import { fireEvent, render, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { TODOIST_BASE_URL } from "src/services/todoist";
import TodoListsContextMock from "../../../mocks/Todoist/TodoListsContextMock.json";
import TodoList from "src/components/TodoListsModal/components/TodoList/TodoList";
import GetTasksMock from "../../../mocks/Todoist/GetTasksMock.json";

const shoppingList = TodoListsContextMock.find(section => section.name === "Shopping List");

const server = setupServer(
	http.get(`${TODOIST_BASE_URL}/tasks`, () => HttpResponse.json(GetTasksMock)),
	http.delete(`${TODOIST_BASE_URL}/tasks/:id`, () => new HttpResponse)
);

beforeAll(() => {
	localStorage.setItem("todoistToken", "TEST_TOKEN");
	server.listen({ onUnhandledRequest: 'error' });
});

afterAll(() => { 
	localStorage.removeItem("todoistToken");
	server.close();
});

afterEach(() => server.resetHandlers());

describe('TodoList', () => {
  test("should render the 'TodoList' component", async () => {
		const result = render(<TodoList list={shoppingList} />);
		expect(result).toBeTruthy();
  });

	test("'Delete Task' button should delete the item", async () => {
		const result = render(<TodoList list={shoppingList} />);
		await waitFor(() => expect(result.getByText("Task to be deleted")).toBeInTheDocument());
		const dropdownToggle = result.container.querySelector('.dropdown-toggle');
		fireEvent.click(dropdownToggle);
		const button = result.container.querySelector('.delete-task-button');
		fireEvent.click(button);
		await waitForElementToBeRemoved(result.getByText('Task to be deleted'));
		expect(result.queryByText("Task to be deleted")).toBeNull();
	});
});