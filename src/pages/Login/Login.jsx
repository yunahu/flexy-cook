import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getQueryString } from "src/utils/common";
import env from "src/utils/env";

const Login = () => {
	const navigate = useNavigate();
	useEffect(() => {
		const getTodoistToken = async () => {
			const queryString = getQueryString();
			
			if (localStorage.getItem('secretString') !== queryString.state) {
				alert('Todoist login unsuccessful.'); // TODO: Replace
				navigate('/');
				return;
			}

			try { 
				const res = await axios.post(`${env.API_URL}/todoist_token`, {code: queryString.code});
				localStorage.setItem('todoistToken', res.data);
				alert('Todoist login successful.'); // TODO: Replace
			} catch (err) {
				console.error(err);
			}
		
			navigate('/');
		}
		getTodoistToken();
	}, []);

	return (
		<div></div>
	);
};

export default Login;