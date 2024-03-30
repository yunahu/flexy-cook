import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faPlus, faCheck, faDiagramNext, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from './TodoList.module.css';
import { addSubtask, addTask, closeTask, deleteTask, getActiveTasks, updateTask } from 'src/services/todoist';

const findTask = (taskId, tasks) => {
	for (const task of tasks) {
		if (task.id === taskId) return task;
		else if (task.children) {
			const found = findTask(taskId, task.children);
			if (found) return found; 
		};
	};
};

const TodoList = props => {
	const [ tasks, setTasks ] = useState([]);

	const deleteFromTree = async task => {
		try { 
			await deleteTask(task.id);

			let tasksClone = structuredClone(tasks);
			
			if (task.parent_id) {
				const parent = findTask(task.parent_id, tasksClone);
				parent.children = parent.children.filter(x => x.id !== task.id);
			} else {
				tasksClone = tasksClone.filter(x => x.id !== task.id);
			};
			
			setTasks(tasksClone);

		} catch (err) {
			console.error(err);
		};
	};

	const handleKeyDown = async (event, task) => {
		if (event.key === 'Enter') {
			try {
				event.preventDefault();
				event.target.blur();
				await updateTask(task.id, event.target.innerHTML);

				let tasksClone = structuredClone(tasks);
				findTask(task.id, tasksClone).content = event.target.innerHTML;
				setTasks(tasksClone);

			} catch (err) {
				console.error(err);
			};
		};
	};

	const handleAddSubtask = async task => {
		try { 
			const addedTask = await addSubtask('New subtask', null, null, task.id);

			let tasksClone = structuredClone(tasks);
			const taskClone = findTask(task.id, tasksClone);
			
			if (taskClone.children) {
				const children = taskClone.children;
				children.unshift(addedTask);
			} else {
				taskClone.children = [addedTask];
			};

			setTasks(tasksClone);

		} catch (err) {
			console.error(err);
		};
	};

	const handleAddTask = async () => {
		try { 
			const addedTask = await addTask('New task', null, props.list.id);

			let tasksClone = structuredClone(tasks);
			tasksClone.push(addedTask);
			setTasks(tasksClone);

		} catch (err) {
			console.error(err);
		};
	};

	const handleCloseTask = async task => {
		try { 
			await closeTask(task.id);

			let tasksClone = structuredClone(tasks);
			
			if (task.parent_id) {
				const parent = findTask(task.parent_id, tasksClone);
				parent.children = parent.children.filter(x => x.id !== task.id);
			} else {
				tasksClone = tasksClone.filter(x => x.id !== task.id);
			};
			
			setTasks(tasksClone);

		} catch (err) {
			console.error(err);
		};
	};

	const renderTask = (task, level) => (
		<>
			<div className={styles.taskContainer}
				style={{paddingLeft: 15 + level * 35}}
			>
				<div className={styles.checkCircleContainer}>

					<div className={styles.checkCircle}>
						<FontAwesomeIcon icon={faCheck}
                     onClick={(evt) => {
                        setTimeout(handleCloseTask, 300, task);
                           /** Delay for animation: consider async function delay time */
                        let circleContainer = evt.target.parentNode.parentNode;
                        let taskContainer = circleContainer.parentNode;
                        circleContainer.style.cssText = 'border-color: transparent; transition: all 1s;';
                        taskContainer.style.cssText = 'color: transparent; text-decoration: line-through; transition: all 1s;';
                     }}/>
					</div>
				</div>
				<div className={styles.taskTitle} 
					contentEditable 
					spellCheck="false"
					onKeyDown={event => handleKeyDown(event, task)}
				>
					{task.content}
				</div>
				<div className={styles.dropdownContainer}>
					<Dropdown className={styles.taskDropdown}>
						<Dropdown.Toggle 
							id="dropdown-basic" 
							className={styles.dropdownToggle}
						>
							<div className={styles.gearIcon}><FontAwesomeIcon icon={faGear} /></div>
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item onClick={() => handleAddSubtask(task)}>
                        <FontAwesomeIcon icon={faDiagramNext} />&emsp;Add Subtask
                     </Dropdown.Item>
							<Dropdown.Item onClick={() => deleteFromTree(task)}>
                        <FontAwesomeIcon icon={faTrashCan} />&emsp;Delete Task
                     </Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>
			{task.children && task.children.length > 0 && (
				<div>
					{task.children.map(child => <div key={child.id}>{renderTask(child, level+1)}</div>)}
				</div>
			)}
		</>
	);

	useEffect(() => {
		const setFCTasks = async (projectId, sectionId) => {
			try {
				const response = await getActiveTasks(projectId, sectionId);
				const makeTaskTree = (arr) => {
					const treeArr = [];
					while (arr.length) {
						const last = arr.pop();

						if (!last.parent_id) {
							treeArr.unshift(last);
							continue;
						};

						for (let i = arr.length - 1; i >= 0; i--) {
							if (last.parent_id === arr[i].id) {
								if (arr[i].chlidren) {
									const children = arr[i].children;
									children.unshift(last);
								} else {
									arr[i].children = [last];
								};
							};
						};
					};
					return treeArr;
				};

				setTasks(makeTaskTree(response));
			} catch (err) {
				console.error(err);
			};
		};

		setFCTasks(props.list.project_id, props.list.id);
	}, []);

	return (
		<>
			{tasks.map(task => <div key={task.id}>{renderTask(task, 0)}</div>)}
			<div className={styles.taskContainer} onClick={handleAddTask}>
				<div className={styles.plusIcon}>
					<FontAwesomeIcon className='faplus' icon={faPlus} />	
				</div>
				<div className={styles.taskTitle}>Add task</div>
			</div>
		</>
	);
};

export default TodoList;
