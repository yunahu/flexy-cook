import React, { createContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "src/App.css";
import Router from "src/Router/Router";
import Navbar from "src/components/Navbar/Navbar";
import Footer from "src/components/Footer/Footer";

export const TodoListsContext = createContext();

const App = () => {
	const [todoLists, setTodoLists] = useState([]);
  
	return (
    <TodoListsContext.Provider value={{ todoLists, setTodoLists }}>
      <Navbar />
      <Router />
      <Footer />
		</TodoListsContext.Provider>
  );
};

export default App;
