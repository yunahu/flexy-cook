import styles from './index.module.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { addProject, addSection, getAuth, getProjects, getSections } from 'src/services/todoist';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import TodoList from './components/TodoList';

const getFlexyCookProject = async () => {
	try {
		const projects = await getProjects();
		
		for (let i = 0; i < projects.length; i++) {
			if (projects[i].name === 'Flexy Cook') {
				return projects[i];
			};
		};
		
		const flexyCookProject = await addProject('Flexy Cook');
		return flexyCookProject;
	} catch (err) {
		console.error(err);
	};
};

const TodoListsModal = props => {
	const [todoLists, setTodoLists] = useState([]);

	if (!localStorage.getItem('todoistToken')) getAuth();	

	useEffect(() => {
		const run = async () => {
			try {
				const flexyCookProject = await getFlexyCookProject();		
				const flexyCookSections = await getSections(flexyCookProject.id);
				setTodoLists(flexyCookSections);
			} catch (err) {
				console.error(err);
			}
		};
	
		run();
	}, []);

	const onTabSelect = async key => {
		if (key === 'addList') {
			try { 
				const addedSection = await addSection('New list', todoLists[0].project_id);
	
				let todoListsClone = structuredClone(todoLists);
				todoListsClone.push(addedSection);
				console.log(addedSection);
				setTodoLists(todoListsClone);
	
			} catch (err) {
				console.error(err);
			};
		};
	};

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header className={styles.header} closeButton>
			</Modal.Header>
				<div>
					<Tabs
						defaultActiveKey={todoLists[0]?.id}
						id="todolistTab"
						mountOnEnter
						onSelect={key => onTabSelect(key)}
						className={`${styles.tabs} mb-3`}
					>
						{todoLists.map((todoList) => (
							<Tab 
								key={todoList.id}
								eventKey={todoList.id} 
								title={todoList.name} 
							>
								<TodoList list={todoList} />
							</Tab>
						))}
							<Tab eventKey={`addList`} title='+' key='addList1'>
						</Tab>
					</Tabs>  
				</div>
		</Modal>
	);
};

export default TodoListsModal;
