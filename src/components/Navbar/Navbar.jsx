// import React from 'react';
import { Nav, Navbar as NavbarBootstrap, NavDropdown, InputGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

import { CardList } from 'react-bootstrap-icons';
import { BrightnessHighFill } from 'react-bootstrap-icons';
import { CartPlusFill } from 'react-bootstrap-icons';

import logo from './img/logo.png';

const Navbar = () => {
  // eslint-disable-next-line no-unused-vars
  const handleSearch = (event) => {
    event.preventDefault();
    // Handle search logic here
  };

  return (
    <div className={styles.container}>
      <NavbarBootstrap expand="lg" className={styles.nav}>
        <NavbarBootstrap.Brand as={Link} to="/">
          <img src={logo} alt="Logo" className={styles.logo} />
        </NavbarBootstrap.Brand>
        <NavbarBootstrap.Toggle aria-controls="basic-navbar-nav" />
        <NavbarBootstrap.Collapse id="basic-navbar-nav" className="justify-content-center">
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
            <NavDropdown title="Advanced Search" id="basic-nav-dropdown" className={styles.advanceButton}>
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </div>
        </NavbarBootstrap.Collapse>
        <Nav className="ml-auto">
          <div className={styles.iconContainer}>
            <BrightnessHighFill className={styles.icon} />
            <Nav.Link as={Link} to="/categories" className={styles.categoriesText}>
              Theme
            </Nav.Link>
          </div>
          <div className={styles.iconContainer}>
            <CardList className={styles.icon} />
            <NavDropdown title="Todo List" id="basic-nav-dropdown" className={styles.categoriesText}>
              <NavDropdown.Item href="#action/3.1"><CartPlusFill className={styles.dropIcon} />Shopping List</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2"><CartPlusFill className={styles.dropIcon} />Memos</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3"><CartPlusFill className={styles.dropIcon} />Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4"><CartPlusFill className={styles.dropIcon} />Separated link</NavDropdown.Item>
            </NavDropdown>
          </div>
        </Nav>
      </NavbarBootstrap>
    </div>
  );
};

export default Navbar;