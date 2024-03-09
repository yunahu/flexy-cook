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

export const colorByNum = (num) => {
	switch (num % 7) {
		case 1:
			return 'primary';
		case 2:
			return 'secondary';
		case 3:
			return 'info';
		case 4:
			return 'success';
		case 5:
			return 'warning';
		case 6:
			return 'danger';
		case 7:
			return 'light';
		case 0:
			return 'dark';
		default:
			return 'primary';
	}
};