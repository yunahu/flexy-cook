// import React from 'react';
import SearchBar from "../Searchbar/SearchBar";
import AdvancedSearchMenu from "src/pages/Search/components/AdvancedSearch/AdvancedSearch";
import styles from "./Navbar.module.css";
import NavDropdownMenu from "./NavDropdownMenu/NavDropdownMenu";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav, Navbar as NavbarBootstrap } from "react-bootstrap";

import { CartPlusFill, BrightnessHighFill } from "react-bootstrap-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHouse } from "@fortawesome/free-solid-svg-icons";
import logo from "./img/logo.png";

const Navbar = () => {
  let navigate = useNavigate();

  const [ingredients, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const handleTagsChange = (tags) => {
    setTags(tags);
  };

  const items = [
    {
      icon: <CartPlusFill size={25}></CartPlusFill>,
      title: "Shopping List",
      ref: "",
      key: "shoppingList",
    },
    {
      icon: <CartPlusFill size={25}></CartPlusFill>,
      title: "Memos",
      ref: "",
      key: "memo",
    },
    {
      icon: <CartPlusFill size={25}></CartPlusFill>,
      title: "Something",
      ref: "",
      key: "something",
    },
    {
      icon: <CartPlusFill size={25}></CartPlusFill>,
      title: "Separated link",
      ref: "",
      key: "link",
    },
  ];

  return (
    <nav className={styles.container}>
      <div className={styles.navElements}>
        <div className={styles.navDropdowns}>
          <div className={`${styles.iconContainer} ${styles.homeIcon}`}>
            <FontAwesomeIcon icon={faHouse} className={styles.icon} />
            <Nav.Link as={Link} to="/" className={styles.iconText}>
              Home
            </Nav.Link>
          </div>
          <div className={`${styles.iconContainer} ${styles.searchIcon}`}>
            <FontAwesomeIcon icon={faSearch} className={styles.icon} />
            <Nav.Link as={Link} to="/search" className={styles.iconText}>
              Search
            </Nav.Link>
          </div>
        </div>

        <NavbarBootstrap.Brand as={Link} to="/">
          <img src={logo} alt="Logo" className={styles.logo} />
        </NavbarBootstrap.Brand>
        <div className={styles.searches}>
          <SearchBar
            text="onion, canned tomato"
            btnText={"Search"}
            className={styles.searchBar}
            value={ingredients}
            onChange={handleOnChange}
            btnClick={() =>
              navigate("/search", { state: { ingredients, tags } })
            }
          />
          <AdvancedSearchMenu onTagsChange={handleTagsChange} />
        </div>
        <div className={styles.navDropdowns}>
          <div className={styles.iconContainer}>
            <BrightnessHighFill className={styles.icon} />
            <Nav.Link as={Link} to="/categories" className={styles.iconText}>
              Theme
            </Nav.Link>
          </div>
          <div className={styles.todo}>
            <NavDropdownMenu
              drop="down-centered"
              buttonTitle="TODO"
              items={items}
            />
          </div>
          <div className={styles.menu}>
            <NavDropdownMenu
              drop="down-centered"
              buttonTitle="Menu"
              items={items}
            />
          </div>
        </div>
      </div>
    </nav>
  );
  handleSearch();
};

export default Navbar;
