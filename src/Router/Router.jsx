import { Route, Routes } from "react-router-dom";
import Home from "src/pages/Home/Home";
import SearchPage from "src/pages/Search/Search";
import Categories from "src/pages/Categories/Categories";
import Login from "src/pages/Login/Login";
import Recipe from "src/pages/Recipe/Recipe";
import HomeTest from "src/pages/Home/HomeTest";
import SearchTest from "src/pages/Search/components/SearchPage.jsx";

const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/test" element={<HomeTest />} />
    <Route path="/testSearch" element={<SearchTest />} />
    <Route path="/search" element={<SearchPage />} />
    <Route path="/categories" element={<Categories />} />
    <Route path="/login" element={<Login />} />
    <Route path="/recipe" element={<Recipe />} />
    <Route path="*" element={<div>Not Found</div>} />
  </Routes>
);

export default Router;
