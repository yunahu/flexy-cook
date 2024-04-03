import { Route, Routes } from "react-router-dom";
import Home from "src/pages/Home/Home";
import Search from "src/pages/Search/Search";
import Login from "src/pages/Login/Login";
import Recipe from "src/pages/Recipe/Recipe";

const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />å
    <Route path="/search" element={<Search />} />
    <Route path="/login" element={<Login />} />
    <Route path="/recipe/:id" element={<Recipe />} />
    <Route path="*" element={<div>Not Found</div>} />
  </Routes>
);

export default Router;
