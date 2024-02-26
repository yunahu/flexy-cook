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

export const getProjects = () => todoistAPI.get('/projects');

export const addProject = (projectName) => todoistAPI.post('/projects', { name: projectName });

export const addSubproject = (projectName, parentId) => todoistAPI.post('/projects', {name: projectName, parent_id: parentId});

export const addSection = (sectionName, projectId) => todoistAPI.post('/sections',{name: sectionName, project_id: projectId});

export const addTask = (taskName, projectId, sectionId) => todoistAPI.post('/tasks', {content: taskName, project_id: projectId,	section_id: sectionId});

export const addSubtask = (subtaskName, projectId, sectionId, parentId) => todoistAPI.post('/tasks', {content: subtaskName,	project_id: projectId, section_id: sectionId,	parent_id: parentId});
