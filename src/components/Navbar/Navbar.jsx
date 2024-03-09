<<<<<<< HEAD
import React from 'react';
import { Nav, Navbar as NavbarBootstrap, NavDropdown, InputGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { CardList, FilePostFill, GearWideConnected, PersonCircle, House, Search } from 'react-bootstrap-icons';
import { BrightnessHighFill } from 'react-bootstrap-icons';
import { CartPlusFill } from 'react-bootstrap-icons';

=======
// import React from 'react';
import SearchBar from "../Searchbar/SearchBar";
import AdvancedSearchMenu from "src/pages/Search/components/AdvancedSearch/AdvancedSearch";
import styles from "./Navbar.module.css";
import NavDropdownMenu from "./NavDropdownMenu/NavDropdownMenu";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav, Navbar as NavbarBootstrap } from "react-bootstrap";

import {
  CardList,
  CartPlusFill,
  BrightnessHighFill,
} from "react-bootstrap-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHouse } from "@fortawesome/free-solid-svg-icons";

import logo from "./img/logo.png";
>>>>>>> origin/main

import logo from './img/logo.png';
const Navbar = () => {
<<<<<<< HEAD
  const handleSearch = (event) => {
    event.preventDefault();
    history.push('../pages/Search'); // Navigate to the search page
=======
  let navigate = useNavigate();

  const [ingredients, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const handleOnChange = (e) => {
    setSearch(e.target.value);
>>>>>>> origin/main
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
<<<<<<< HEAD
    <div className={styles.container}>
      <NavbarBootstrap className={styles.nav}>
=======
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
>>>>>>> origin/main
        <NavbarBootstrap.Brand as={Link} to="/">
          <div className={styles.iconHome}>
            <House className={styles.icon} />
            <Nav.Link as={Link} to="/categories" className={styles.categoriesText}>
              Home
            </Nav.Link>
          </div>
          
          <img src={logo} alt="Logo" className={styles.logo} />
        </NavbarBootstrap.Brand>
<<<<<<< HEAD
        <div className={styles.iconHome}>
              <Search className={styles.icon} />
              <Nav.Link as={Link} to="/categories" className={styles.categoriesText}>
                Search
              </Nav.Link>
            </div>
        <NavbarBootstrap.Toggle aria-controls="basic-navbar-nav" />
        <NavbarBootstrap.Collapse className="justify-content-center">
          <div className="d-flex flex-column align-items-center">
            
            <form className="d-flex">
              <InputGroup className={styles.searchbar}>
                <FormControl
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <Button className={styles.button} type="submit">Search</Button>
              </InputGroup>
            </form>
            <NavbarBootstrap.Brand as={Link} to="/" className={styles.logoCenter}>
              <img src={logo} alt="Logo" className={styles.logoCenter} />
            </NavbarBootstrap.Brand>
            <NavDropdown title="Advanced Search" id="basic-nav-dropdown" className={styles.advanceButton}>
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </div>
        </NavbarBootstrap.Collapse>
        <Nav className={styles.right}>
=======
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
>>>>>>> origin/main
          <div className={styles.iconContainer}>
            <BrightnessHighFill className={styles.icon} />
            <Nav.Link as={Link} to="/categories" className={styles.iconText}>
              Theme
            </Nav.Link>
          </div>
<<<<<<< HEAD
          <div className={styles.iconContainer}>
            <CardList className={styles.icon} />
            <NavDropdown title="Todo List" id="basic-nav-dropdown" className={styles.categoriesText}>
              <NavDropdown.Item href="#action/3.1" className={styles.drop}><CartPlusFill className={styles.dropIcon} />Shopping List</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2" className={styles.drop}><FilePostFill className={styles.dropIcon} />Memos</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3" className={styles.drop}><GearWideConnected className={styles.dropIcon} />Manage My Tasks</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" className={styles.drop}><PersonCircle className={styles.dropIcon} />Login with todoist</NavDropdown.Item>
            </NavDropdown>
          </div>
        </Nav>
      </NavbarBootstrap>
      
    </div>
=======
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
>>>>>>> origin/main
  );
  handleSearch();
};

<<<<<<< HEAD

export default Navbar;
=======
export default Navbar;
>>>>>>> origin/main
