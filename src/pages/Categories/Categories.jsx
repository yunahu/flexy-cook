import { Button } from 'react-bootstrap';
import { useState } from 'react';
import TodoListsModal from 'src/components/TodoListsModal/TodoListsModal';

const Categories = () => {	
  const [modalShow, setModalShow] = useState(false);

	return (
		<div>
			<Button variant="primary" onClick={() => setModalShow(true)}>
				Open To-do List
			</Button>
			<TodoListsModal
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>
		</div>
	);
};

export default Categories;
