import axios from 'axios';
import env from 'src/utils/env';
import { generateRandomString } from 'src/utils/string';

export const TODOIST_BASE_URL = 'https://api.todoist.com/rest/v2';

export const todoistAPI = axios.create({
	baseURL: TODOIST_BASE_URL
});

todoistAPI.interceptors.request.use(config => {
	const AUTH_TOKEN = localStorage.getItem('todoistToken');
	if (AUTH_TOKEN) {
		config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
	}
	return config;
},
	error => Promise.reject(error)
);

todoistAPI.interceptors.response.use(response => response.data,
	error => Promise.reject(error)
);

export const getAuth = async () => {
	const randomStr = generateRandomString();
	localStorage.setItem("secretString", randomStr);
	location.href = `https://todoist.com/oauth/authorize?client_id=${env.TODOIST_CLIENT_ID}&scope=task:add,data:read,data:read_write,data:delete,project:delete&state=${randomStr}`;
};


// Projects

export const getProjects = () => todoistAPI.get('/projects');

export const getProject = projectId => todoistAPI.get(`/projects/${projectId}`);

export const updateProject = (projectId, projectNewName) => todoistAPI.post(`/projects/${projectId}`, { name: projectNewName });

export const addProject = projectName => todoistAPI.post('/projects', { name: projectName });

export const addSubproject = (projectName, parentId) => todoistAPI.post('/projects', { name: projectName, parent_id: parentId });

export const deleteProject = projectId => todoistAPI.delete(`/projects/${projectId}`);


// Sections

export const getSections = projectId => todoistAPI.get(`/sections?project_id=${projectId}`);

export const getSection = sectionId => todoistAPI.get(`/sections/${sectionId}`);

export const updateSection = (sectionId, sectionNewName) => todoistAPI.post(`/sections/${sectionId}`, { name: sectionNewName });

export const addSection = (sectionName, projectId) => todoistAPI.post('/sections', { name: sectionName, project_id: projectId });

export const deleteSection = sectionId => todoistAPI.delete(`/sections/${sectionId}`);


// Tasks

export const getActiveTasks = (projectId, sectionId) => todoistAPI.get('/tasks', { params: { project_id: projectId, section_id: sectionId } });

export const getActiveTask = taskId => todoistAPI.get(`/tasks/${taskId}`);

export const updateTask = (taskId, taskNewName) => todoistAPI.post(`/tasks/${taskId}`, { content: taskNewName });

export const closeTask = taskId => todoistAPI.post(`/tasks/${taskId}/close`);

export const reopenTask = taskId => todoistAPI.post(`/tasks/${taskId}/reopen`);

export const addTask = (taskName, projectId, sectionId) => todoistAPI.post('/tasks', { content: taskName, project_id: projectId, section_id: sectionId });

export const addSubtask = (subtaskName, projectId, sectionId, parentId) => todoistAPI.post('/tasks', { content: subtaskName, project_id: projectId, section_id: sectionId, parent_id: parentId });

export const deleteTask = taskId => todoistAPI.delete(`/tasks/${taskId}`);


// Others

export const handleNotLoggedIn = () => {
	alert('Please log in with Todoist first.'); // TODO: Replace it
};

export const getFlexyCookProject = async () => {
	try {
		const projects = await getProjects();

		for (let i = 0; i < projects.length; i++) {
			if (projects[i].name === 'FlexyCook') {
				return projects[i];
			};
		};

		const flexyCookProject = await addProject('FlexyCook');
		return flexyCookProject;
	} catch (err) {
		console.error(err);
	};
};

export const getShoppingList = async () => {
	const flexyCookProject = await getFlexyCookProject();
	const flexyCookSections = await getSections(flexyCookProject.id);
	for (const section of flexyCookSections) {
		if (section.name === 'Shopping List') return section;
	}
	return addSection('Shopping List', flexyCookProject.id);
};

export const addToShoppingList = async recipe => {
	if (!localStorage.getItem('todoistToken')) {
		handleNotLoggedIn();
		return;
	};

	const shoppingList = await getShoppingList();

	try {
		await Promise.all(recipe.extendedIngredients.map(ingredient => addTask(`${ingredient.name} - ${ingredient.measures.metric.amount} ${ingredient.measures.metric.unitLong}`, null, shoppingList.id)));
		alert('Success');	// Do not remove, or modify the test to not rely on this
	} catch (err) {
		console.error(err);
	};
};

export const generateStepsList = async recipe => {
	if (!localStorage.getItem('todoistToken')) {
		handleNotLoggedIn();
		return;
	};

	try {
		const length = recipe.analyzedInstructions.length;
		const stepsLists = [];
		if (length) {
			for (let i = 0; i < length; i++) {
				const title = recipe.analyzedInstructions[i].name || recipe.title;
				const flexyCookProject = await getFlexyCookProject();
				const stepList = await addSection(title, flexyCookProject.id);
				const steps = recipe.analyzedInstructions[i].steps;
				for (const step of steps) {
					await addTask(`${step.number}. ${step.step}`, flexyCookProject.id, stepList.id);
				};
				stepsLists.push(stepList);
			};

			alert('Success');
			return stepsLists;

		} else {
			alert('This recipe cannot be used to generate a cooking list. Try another recipe.'); // TODO: Replace it
		};
	} catch (err) {
		console.error(err);
	};
};