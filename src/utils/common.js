export const getQueryString = () => {
	const urlParams = new URLSearchParams(location.search);
	return Object.fromEntries(urlParams);
};
