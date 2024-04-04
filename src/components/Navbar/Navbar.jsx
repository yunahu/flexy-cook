// import React from 'react';
import SearchBar from "src/components/SearchBar/SearchBar";
import AdvancedSearchMenu from "src/pages/Search/components/AdvancedSearch/AdvancedSearch";
import styles from "./Navbar.module.css";
import NavDropdownMenu from "./NavDropdownMenu/NavDropdownMenu";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Nav, Navbar as NavbarBootstrap } from "react-bootstrap";
import { Stack } from "react-bootstrap";

import { BrightnessHighFill } from "react-bootstrap-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHouse,
  faSquarePlus,
  faBasketShopping,
  faGear,
  faRightToBracket,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import logo from "src/assets/images/logo.png";
import TodoListsModal from "src/components/TodoListsModal/TodoListsModal";
import { getAuth } from "src/services/todoist";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [ingredients, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  // clear search bar when navigating to a different page
  useEffect(() => {
    if (location.pathname != "/search") {
      setSearch("");
    }
  }, [location.pathname]);

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const handleTagsChange = (tags) => {
    setTags(tags);
  };

  // Dropdown items
  const todoistItems = [
    {
      icon: <FontAwesomeIcon icon={faSquarePlus} />,
      title: "Add New Memo",
      ref: "",
      key: "addNewMemo",

      onClick: () => {
        if (!localStorage.getItem("todoistToken"))
          alert("Please log in with Todoist first."); // TODO: Replace
        else setModalShow(true); // TODO: Replace
      },
    },

    {
      icon: <FontAwesomeIcon icon={faBasketShopping} />,
      title: "My Shopping List",
      ref: "",
      key: "shoppingList",

      onClick: () => {
        // Toggle the todoist modal & switch to shopping list tab
        alert("Toggle the todoist modal & switch to shopping list tab");
      },
    },

    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: "Manage My Tasks",
      ref: "",
      key: "manageMyTasks",

      onClick: () => {
        if (!localStorage.getItem("todoistToken"))
          alert("Please log in with Todoist first."); // TODO: Replace
        else setModalShow(true); // TODO: Replace
      },
    },

    {
      icon: <FontAwesomeIcon icon={faRightToBracket} />,
      title: "Login with Todoist",
      ref: "",
      key: "loginWithTodoist",

      onClick: () => {
        if (!localStorage.getItem("todoistToken")) getAuth();
        else alert("You're already logged in."); // TODO: Replace
      },
    },
  ];

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

          {/** If not on search page */}
          {location.pathname !== "/search/" &&
            location.pathname !== "/search" && (
              <Stack className={styles.searchBar} direction="vertical">
                {/** Search input & Advanced Search dropdown */}
                <SearchBar
                  text="Enter ingredients with comma-separated list"
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
            )}

          {/** If on search page */}
          {location.pathname == "/search/" && (
            <Nav.Link
              as={Link}
              to="/"
              className={`${styles.iconContainer} ${styles.homeIcon}`}
            >
              <Stack direction="vertical">
                <FontAwesomeIcon icon={faHouse} className={`${styles.icon}`} />
                <span>Home</span>
              </Stack>
            </Nav.Link>
          )}
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
              items={todoistItems}
            />
          </Stack>

          <Stack
            className={`${styles.iconContainer} ${styles.menuIcon}`}
            direction="vertical"
            onClick={() => {
              /* toggle the display of menu */
              let menu = document.querySelector("#menu");
              let page = document.querySelector("nav + div");
              if (menu.style.display == "none") {
                menu.style.display = "flex";
                page.style.filter = "blur(3px)";
              } else {
                menu.style.display = "none";
                page.style.filter = "blur(0px)";
              }
            }}
          >
            <FontAwesomeIcon icon={faBars} className={styles.icon} />
            <span>Menu</span>
          </Stack>
        </Stack>{" "}
        {/** END right col */}
      </Stack>{" "}
      {/** END nav items */}
      {/** A new row with menu items */}
      <Stack id="menu" className={styles.menu} direction="vertical">
        <Nav.Link
          as={Link}
          to="/search"
          className={`${styles.menuItem} ${styles.menuSearch}`}
        >
          <Stack direction="horizontal">
            <FontAwesomeIcon icon={faSearch} className={styles.menuIcon} />
            <span>Search</span>
          </Stack>
        </Nav.Link>

        <Stack
          className={`${styles.menuItem} ${styles.menuTheme}`}
          direction="horizontal"
        >
          <BrightnessHighFill className={styles.menuIcon} />
          <span>Theme</span>
        </Stack>

        <Stack
          className={`${styles.menuItem} ${styles.menuTodo}`}
          direction="horizontal"
        >
          <NavDropdownMenu
            drop="down-centered"
            buttonTitle="TODO"
            items={todoistItems}
          />
        </Stack>
      </Stack>{" "}
      {/** End menu dropdown */}
      <TodoListsModal
        id="todoListsModal"
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </nav>
  );
};

export default Navbar;
