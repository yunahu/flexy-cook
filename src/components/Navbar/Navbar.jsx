// import React from 'react';
import SearchBar from "../Searchbar/Searchbar";
import AdvancedSearchMenu from "src/pages/Search/components/AdvancedSearch/AdvancedSearch";
import styles from "./Navbar.module.css";
import NavDropdownMenu from "./NavDropdownMenu/NavDropdownMenu";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav, Navbar as NavbarBootstrap } from "react-bootstrap";
import { Stack, Dropdown } from "react-bootstrap";

import { CartPlusFill, BrightnessHighFill, CardList } from "react-bootstrap-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHouse } from "@fortawesome/free-solid-svg-icons";
import logo from "./img/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

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
  const dropdowmSmall = [
    
    {
      icon: (
        <Nav.Link
            as={Link}
            to="/search"
            className={styles.dropdownSmall} 
          >
        <Stack direction="horizontal">
          <FontAwesomeIcon icon={faSearch} className={styles.iconSmall} size={25} />
          <span className={styles.textSmall}>Search</span>
        </Stack></Nav.Link>
      )
    },
    {
      icon: (
        <Nav.Link
        as={Link}
        to="/"
        className={styles.dropdownSmall} 
      >
        <Stack direction="horizontal">
          <BrightnessHighFill className={styles.iconSmall} size={25} />
          <span className={styles.textSmall}>Theme</span>
        </Stack></Nav.Link>
      )
    },
    {
      icon: (
        <Stack
        className={styles.dropdownSmall}
        direction="horizontal"
      >
        <Dropdown>
      <Dropdown.Toggle variant="none">
        <CardList className={styles.iconSmall} size={25} />
        <span className={styles.textSmall}>Todo</span>
        </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Shopping list</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Memos</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Action 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      </Stack>
      )
    }
  ];
  const isSearchPage = location.pathname === '/search'; 

  const homeIconAndText = isSearchPage && (
    <Nav.Link as={Link} to="/"className={styles.searchHome} >
      <Stack direction="vertical">
        <FontAwesomeIcon icon={faHouse} className={styles.iconHome} />
        <span className={styles.searchHomeText}>Home</span>
      </Stack>
    </Nav.Link>
  );
  
  const isHomePage = location.pathname === '/' || location.pathname === '/test';
const searchBarAndAdvancedSearch = isHomePage && (
  <Stack className={styles.searchBar} direction="vertical">
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
  </Stack>
);
  return (
    <nav className={styles.container}>
      <Stack className={styles.navElements} direction="horizontal" gap={3}>
      
        {/* Collection of nav items */}
        <Stack className={styles.leftCol} direction="horizontal" gap={2}>
       
          {/* Home & Search Icon OR LOGO (switch display between md/lg screen size )*/}

          <Nav.Link
            as={Link}
            to="/"
            
            className={`${styles.iconContainer} ${styles.homeIcon}`}
          >
            
            
            <Stack direction="vertical">
              <FontAwesomeIcon icon={faHouse} className={styles.icon} />
              <span>Home</span>
              
            </Stack>
           
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/search"
            className={`${styles.iconContainer} ${styles.searchIcon}`}
          >
            <Stack direction="vertical">
              <FontAwesomeIcon icon={faSearch} className={styles.icon} />
              <span>Search</span>
            </Stack>
          </Nav.Link>

          <NavbarBootstrap.Brand as={Link} to="/" className={styles.logo}>
            {/** LOGO */}
            <img src={logo} alt="Logo" />
          </NavbarBootstrap.Brand>
          {homeIconAndText}
        </Stack>{" "}
        {/** END left Col */}
        <Stack className={`${styles.middleCol} ms-auto`}>
          <NavbarBootstrap.Brand
            as={Link}
            to="/"
            className={styles.logo}
            id={"middle-logo"}
          >
            {/** LOGO */}
            <img src={logo} alt="Logo" />
          </NavbarBootstrap.Brand>

          <Stack className={styles.searchBar} direction="vertical">
            {/** Search input & Advanced Search dropdown */}
            {searchBarAndAdvancedSearch}
          </Stack>
        </Stack>{" "}
        {/** END middle Search Bar/LOGO */}
        <Stack className={styles.rightCol} direction="horizontal" gap={4}>
          {/** Theme & Todo OR Hamburger (switch between lg/md display) */}

          <Stack
            className={`${styles.iconContainer} ${styles.themeIcon}`}
            direction="vertical"
          >
            <BrightnessHighFill className={styles.icon} />
            <span>Theme</span>
          </Stack>

          <Stack
            className={`${styles.iconContainer} ${styles.todoIcon}`}
            direction="vertical"
          >
            <NavDropdownMenu
              drop="down-centered"
              buttonTitle="TODO"
              items={items}
            />
          </Stack>

          <Stack
            className={`${styles.iconContainer} ${styles.menuIcon}`}
            direction="vertical"
          >
            <NavDropdownMenu 
            
              drop="drop-center"
              buttonTitle="Menu"
              items={dropdowmSmall}
              className={styles.dropdownSmall}
              
            />
          </Stack>
        </Stack>{" "}
        {/** END right col */}
      </Stack>{" "}
      {/** END nav items */}
    </nav>
  );
  handleSearch();
};

export default Navbar;
