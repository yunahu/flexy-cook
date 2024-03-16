const env = {
	TODOIST_CLIENT_ID: import.meta.env.VITE_TODOIST_CLIENT_ID,
	API_URL: import.meta.env.VITE_API_URL,
	USE_HASH_ROUTER: import.meta.env.VITE_USE_HASH_ROUTER === 'true',
};

export default env;
