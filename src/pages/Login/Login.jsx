import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TodoListsContext } from "src/App";
import { addSection, getFlexyCookProject, getSections } from "src/services/todoist";
import { getQueryString } from "src/utils/common";
import env from "src/utils/env";

const Login = () => {
	const { todoLists, setTodoLists } = useContext(TodoListsContext);

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

				const orderSections = async (sections, flexyCookProject) => {
					const orderedSections = [];
					let existsMemos = false;
					let existsShoppingList = false;
					
					for (const section of sections) {
						if (section.name === 'Memos') {
							existsMemos = true;
							orderedSections.splice(0, 0, section);
						} else if (section.name === 'Shopping List') {
							existsShoppingList = true;
							if (orderedSections[0]?.name === 'Memos') {
								orderedSections.splice(1, 0, section);
							} else {
								orderedSections.splice(0, 0, section);
							};
						} else {
							orderedSections.push(section);
						};
					};
					
					
					if (!existsMemos) {
						const memos =  await addSection('Memos', flexyCookProject.id);
						orderedSections.splice(0, 0, memos);
					};
	
					if (!existsShoppingList) {
						const shoppingList = await addSection('Shopping List', flexyCookProject.id);
						orderedSections.splice(1, 0, shoppingList);
					};
	
					return orderedSections;
				};
				
				const flexyCookProject = await getFlexyCookProject();	
				const flexyCookSections = await getSections(flexyCookProject.id);
				const orderedSections = await orderSections(flexyCookSections, flexyCookProject);
				setTodoLists(orderedSections);
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