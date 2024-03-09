import { Route, Routes } from "react-router-dom";
import Home from "src/pages/Home";
import Search from "src/pages/Search";
import Categories from "src/pages/Categories";
import Login from "src/pages/Login";

const Router = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/search" element={<Search />} />
		<Route path="/categories" element={<Categories />} />
		<Route path="/login" element={<Login />} />
		<Route path="*" element={<div>Not Found</div>} />
	</Routes>
);

export default Router;