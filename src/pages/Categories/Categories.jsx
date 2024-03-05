import { Button } from 'react-bootstrap';
import styles from './index.module.css';
import { getAuth, getProjects } from 'src/services/todoist';
import axios from 'axios';

const Categories = () => {
	const handleGetProjectsButtonClick = async () => {
		if (localStorage.getItem('todoistToken')) {
			try {
				const projects = await getProjects();
				console.log(projects); // TODO: Delete
			} catch (err) {
				console.error(err); // TODO: Delete
			}
			alert("check the Developer Tool"); // TODO: Replace
		} else {
			getAuth();
		}
	};
	
	return (
		<div className={styles.container}>categories page content
			<div>
				<Button onClick={handleGetProjectsButtonClick}>Get projects</Button>
			</div>
		</div>
	);
};

export default Categories;
