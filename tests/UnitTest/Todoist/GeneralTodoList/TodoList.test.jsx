import { describe, test, expect, afterEach } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { TODOIST_BASE_URL } from "src/services/todoist";
import TodoListsContextMock from "../../../mocks/Todoist/TodoListsContextMock.json";
import AddTaskMock from "../../../mocks/Todoist/AddTaskMock.json";
import TodoList from "src/components/TodoListsModal/components/TodoList/TodoList";

const memos = TodoListsContextMock.find(section => section.name === "Memos");

let addedTask;
const server = setupServer(
	http.get(`${TODOIST_BASE_URL}/tasks`, () => HttpResponse.json([])),
	http.post(`${TODOIST_BASE_URL}/tasks`, async ({ request }) => {
		addedTask = await request.json();
		return HttpResponse.json(AddTaskMock);
	}),
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
		const result = render(<TodoList list={memos} />);
		expect(result).toBeTruthy();
  });

	test("'Add task' button should create a new task", async () => {
		const result = render(<TodoList list={memos} />);
		const button = result.container.querySelector('#add-task-button');
		fireEvent.click(button);
		await waitFor(() => expect(result.getByText('New task')).toBeInTheDocument());
	});
});