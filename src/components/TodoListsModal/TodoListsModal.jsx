import { useContext, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import styles from './TodoListsModal.module.css';
import TodoList from './components/TodoList/TodoList';
import { addSection, deleteSection, getFlexyCookProject, getSections, handleNotLoggedIn } from 'src/services/todoist';
import { TodoListsContext } from 'src/App';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TodoListsModal = props => {
	const { todoLists, setTodoLists } = useContext(TodoListsContext);

	if (!localStorage.getItem('todoistToken')) handleNotLoggedIn();

	const deleteTodoList = async sectionId => {
		try {
			let todoListsClone = structuredClone(todoLists);
			await deleteSection(sectionId);
			todoListsClone = todoListsClone.filter(todoList => todoList.id !== sectionId);
			setTodoLists(todoListsClone);
		} catch (err) {
			console.error(err);
		};
	};

	useEffect(() => {
		const run = async () => {
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

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
         className={styles.modalContainer}
		>
			<Modal.Header className={styles.header} closeButton>
			</Modal.Header>
				<div>
					<Tabs
						defaultActiveKey={todoLists[0]?.id}
						id="todolistTab"
						mountOnEnter
						className={`${styles.tabs} mb-3`}
					>
						{todoLists.map((todoList) => (
							<Tab 
								key={todoList.id}
								eventKey={todoList.id} 
								title={<div>
									{todoList.name}
										<span className={styles.iconX}>
											<FontAwesomeIcon icon={faXmark} onClick={() => deleteTodoList(todoList.id)} />
										</span> 
									</div>}
							>
								<TodoList list={todoList} />
							</Tab>
						))}
					</Tabs>  
				</div>
		</Modal>
	);
};

export default TodoListsModal;
