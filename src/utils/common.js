export const getQueryString = () => {
	const urlParams = new URLSearchParams(location.search);
	return Object.fromEntries(urlParams);
};

export const capitalize = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export const spaceToComma = (str) => {
	return str.split(" ").join(",");
}