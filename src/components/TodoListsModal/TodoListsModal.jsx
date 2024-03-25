import { useContext, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import styles from './TodoListsModal.module.css';
import TodoList from './components/TodoList/TodoList';
import { addSection, getFlexyCookProject, getSections, handleNotLoggedIn } from 'src/services/todoist';
import { TodoListsContext } from 'src/App';

const TodoListsModal = props => {
	const { todoLists, setTodoLists } = useContext(TodoListsContext);

	if (!localStorage.getItem('todoistToken')) handleNotLoggedIn();

	useEffect(() => {
		const run = async () => {
			const orderSections = async (sections, flexyCookProject) => {
				const orderedSections = [];
				let existsShoppingList = false;
				let existsMemos = false;
				
				for (const section of sections) {
					if (section.name === 'Shopping List') {
						existsShoppingList = true;
						orderedSections.splice(0, 0, section);
					} else if (section.name === 'Memos') {
						existsMemos = true;
						if (orderedSections[0]?.name === 'Shopping List') {
							orderedSections.splice(1, 0, section);
						} else {
							orderedSections.splice(0, 0, section);
						};
					} else {
						orderedSections.push(section);
					};
				};
				
				if (!existsShoppingList) {
					const shoppingList = await addSection('Shopping List', flexyCookProject.id);
					orderedSections.splice(0, 0, shoppingList);
				};

				if (!existsMemos) {
					const memos =  await addSection('Memos', flexyCookProject.id);
					orderedSections.splice(1, 0, memos);
				};

				return orderedSections;
			};
			
			try {
				const flexyCookProject = await getFlexyCookProject();		
				const flexyCookSections = await getSections(flexyCookProject.id);
				const orderedSections = await orderSections(flexyCookSections, flexyCookProject);
				setTodoLists(orderedSections);
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
				const todoListsClone = structuredClone(todoLists);
				todoListsClone.push(addedSection);
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
