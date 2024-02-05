import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Categories from "../pages/Categories";

const Router = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/categories" element={<Categories />} />
		<Route path="*" element={<div>Not Found</div>} />
	</Routes>
);

export default Router;