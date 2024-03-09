import axios from 'axios';
import env from 'src/utils/env';
import { generateRandomString } from 'src/utils/string';

const todoistAPI = axios.create({
  baseURL: 'https://api.todoist.com/rest/v2'
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

export const addSection = (sectionName, projectId) => todoistAPI.post('/sections',{ name: sectionName, project_id: projectId });

export const deleteSection = sectionId => todoistAPI.delete(`/sections/${sectionId}`);


// Tasks

export const getActiveTasks = (projectId, sectionId) => todoistAPI.get('/tasks', { params: { project_id: projectId, section_id: sectionId } });

export const getActiveTask = taskId => todoistAPI.get(`/tasks/${taskId}`);

export const updateTask = (taskId, taskNewName) => todoistAPI.post(`/tasks/${taskId}`, { content: taskNewName });

export const closeTask = taskId => todoistAPI.post(`/tasks/${taskId}/close`);

export const reopenTask = taskId => todoistAPI.post(`/tasks/${taskId}/reopen`);

export const addTask = (taskName, projectId, sectionId) => todoistAPI.post('/tasks', { content: taskName, project_id: projectId, section_id: sectionId });

export const addSubtask = (subtaskName, projectId, sectionId, parentId) => todoistAPI.post('/tasks', { content: subtaskName,	project_id: projectId, section_id: sectionId,	parent_id: parentId });

export const deleteTask = taskId => todoistAPI.delete(`/tasks/${taskId}`);