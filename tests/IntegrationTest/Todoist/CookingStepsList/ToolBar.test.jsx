import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import ToolBar from "src/pages/Recipe/components/ToolBar/ToolBar";
import { TodoListsContext } from "src/App";
import { TODOIST_BASE_URL } from "src/services/todoist";
import TodoistProjectsMock from "../../../mocks/Todoist/TodoistProjectsMock.json";
import TodoistSectionsMock from "../../../mocks/Todoist/TodoistSectionsMock.json";
import GetRecipeMock from "../../../mocks/Todoist/GetRecipeMock.json";

vi.stubGlobal("alert", () => {});
const alertMock = vi.spyOn(window, 'alert').mockImplementation(); 

const addedSections =[];
const addedTasks = [];

const FlexyCookProject = TodoistProjectsMock.find(p => p.name === "FlexyCook");

const server = setupServer(
	http.get(`${TODOIST_BASE_URL}/projects`, () => HttpResponse.json(TodoistProjectsMock)),
	http.get(`${TODOIST_BASE_URL}/sections`, () => HttpResponse.json(TodoistSectionsMock)),
	http.post(`${TODOIST_BASE_URL}/sections`, async ({ request }) => {
		const data = await request.json();
		addedSections.push(data);
		const response = {
			id: data.name,
			name: data.name,
			order: 1,
			project_id: data.project_id
		};
		return HttpResponse.json(response);
	}),
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
  test("should render the 'convert to cooking steps' button", async () => {
		const result = customRender(<ToolBar recipe={GetRecipeMock} />);
		const button = result.container.querySelector('#convert-to-cooking-steps-button');

		expect(button).toBeTruthy();
  });

	test("'convert to cooking steps' button should add the cooking steps as tasks to a new section", async () => {
		const expected_tasks = GetRecipeMock.analyzedInstructions.map(instruction => instruction.steps.map(step => ({
			content: `${step.number}. ${step.step}`,
			project_id: FlexyCookProject.id,
			section_id: instruction.name || GetRecipeMock.title
		}))).flat();

		const expected_sections = GetRecipeMock.analyzedInstructions.map(instruction => ({
			name: instruction.name || GetRecipeMock.title,
			project_id: FlexyCookProject.id
		}));

		const result = customRender(<ToolBar recipe={GetRecipeMock} />);
		const button = result.container.querySelector('#convert-to-cooking-steps-button');
		fireEvent.click(button);
		await waitFor(() => expect(alertMock).toBeCalledWith("Success"));

		expect(addedTasks).toEqual(expected_tasks);
		expect(addedSections).toEqual(expected_sections);
	});
});