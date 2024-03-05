import { Route, Routes } from "react-router-dom";
import Home from "src/pages/Home/Home";
import SearchPage from "src/pages/Search/Search";
import Categories from "src/pages/Categories/Categories";
import Login from "src/pages/Login/Login";

const Router = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/search" element={<SearchPage />} />
		<Route path="/categories" element={<Categories />} />
		<Route path="/login" element={<Login />} />
		<Route path="*" element={<div>Not Found</div>} />
	</Routes>
);

export default Router;