// import React from 'react';
import SearchBar from "src/components/SearchBar/SearchBar";
import AdvancedSearchMenu from "src/pages/Search/components/AdvancedSearch/AdvancedSearch";
import styles from "./Navbar.module.css";
import NavDropdownMenu from "./NavDropdownMenu/NavDropdownMenu";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Nav, Navbar as NavbarBootstrap } from "react-bootstrap";
import { Stack } from "react-bootstrap";

import { CartPlusFill, BrightnessHighFill } from "react-bootstrap-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHouse } from "@fortawesome/free-solid-svg-icons";
import logo from "src/assets/images/logo.png";
import TodoListsModal from 'src/components/TodoListsModal/TodoListsModal';
import { getAuth } from "src/services/todoist";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [ingredients, setSearch] = useState("");
  const [tags, setTags] = useState([]);
	const [modalShow, setModalShow] = useState(false);

  // clear search bar when navigating to a different page
  useEffect(() => {
    if (location.pathname != "/testSearch") {
      setSearch("");
    }
  }, [location.pathname]);

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const handleTagsChange = (tags) => {
    setTags(tags);
  };

  const items = [
    // {
    //   icon: <CartPlusFill size={25}></CartPlusFill>,
    //   title: "Shopping List",
    //   ref: "",
    //   key: "shoppingList",
		// 	onClick: () => setModalShow(true),
    // },
    // {
    //   icon: <CartPlusFill size={25}></CartPlusFill>,
    //   title: "Memos",
    //   ref: "",
    //   key: "memo",
		// 	onClick: () => setModalShow(true),
    // },
    {
      icon: <CartPlusFill size={25}></CartPlusFill>,
      title: "Manage My Tasks",
      ref: "",
      key: "manageMyTasks",
			onClick: () => {
				if (!localStorage.getItem('todoistToken')) alert('Please log in with Todoist first.'); // TODO: Replace
				else setModalShow(true); // TODO: Replace
			},
    },
    {
      icon: <CartPlusFill size={25}></CartPlusFill>,
      title: "Login with Todoist",
      ref: "",
      key: "loginWithTodoist",
			onClick: () => {
				if (!localStorage.getItem('todoistToken')) getAuth();
				else alert("You're already logged in."); // TODO: Replace
			},
    },
  ];

  // Check if the user is on search page
  if (window.location.href.indexOf("search") > -1 || window.location.href.indexOf("Search") > -1) {
   console.log("you are on search page");
  } else {
   console.log("you are not on search page");
  }

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

          {location.pathname !== '/search' && <Stack className={styles.searchBar} direction="vertical">
            {/** Search input & Advanced Search dropdown */}
            <SearchBar
              text="onion, canned tomato"
              btnText={"Search"}
              className={styles.searchBar}
              value={ingredients}
              onChange={handleOnChange}
              btnClick={() =>
                navigate("/testSearch", { state: { ingredients, tags } })
              }
            />
            <AdvancedSearchMenu onTagsChange={handleTagsChange} />
          </Stack>}
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
              drop="down-centered"
              buttonTitle="Menu"
              items={items}
            />
          </Stack>
					<TodoListsModal
						show={modalShow}
						onHide={() => setModalShow(false)}
					/>
        </Stack>{" "}
        {/** END right col */}
      </Stack>{" "}
      {/** END nav items */}
    </nav>
  );
};

export default Navbar;
