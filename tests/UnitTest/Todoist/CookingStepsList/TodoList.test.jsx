import { describe, test, expect, afterEach } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { TODOIST_BASE_URL } from "src/services/todoist";
import TodoListsContextMock from "../../../mocks/Todoist/TodoListsContextMock.json";
import TodoList from "src/components/TodoListsModal/components/TodoList/TodoList";
import GetTasksMock from "../../../mocks/Todoist/GetTasksStepsMock.json";
import AddSubtaskMock from "../../../mocks/Todoist/AddSubtaskMock.json";

let addedSubtask;
const stepsList = TodoListsContextMock.find(section => section.name === "Bourbon Molasses Butter");

const server = setupServer(
	http.get(`${TODOIST_BASE_URL}/tasks`, () => HttpResponse.json(GetTasksMock)),
	http.delete(`${TODOIST_BASE_URL}/tasks`, () => new HttpResponse),
	http.post(`${TODOIST_BASE_URL}/tasks`, async ({ request }) => {
		addedSubtask = await request.json();
		return HttpResponse.json(AddSubtaskMock);
	})
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
		const result = render(<TodoList list={stepsList} />);
		expect(result).toBeTruthy();
  });

	test("'Add Subtask' button should add a subtask", async () => {
		const result = render(<TodoList list={stepsList} />);
		await waitFor(() => expect(result.getByText("1. Combine the bourbon and sugar in a small saucepan and cook over high heat until reduced to 3 tablespoons, remove and let cool.")).toBeInTheDocument());
		const dropdownToggle = result.container.querySelector('.dropdown-toggle');
		fireEvent.click(dropdownToggle);
		const button = result.container.querySelector('.add-subtask-button');
		fireEvent.click(button);
		await waitFor(() => expect(result.getByText('New subtask')).toBeInTheDocument());
	});
});