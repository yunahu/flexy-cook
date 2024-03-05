import React from 'react';
import { Nav, Navbar as NavbarBootstrap, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BrightnessHighFill, CardList, CartPlusFill, FilePostFill, GearWideConnected, PersonCircle, House, Search, HandIndex } from 'react-bootstrap-icons';
import styles from './search-nav.module.css';
import logo from './img/logo.png';

const Navbar = () => {
  const handleSearch = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.container}>
      <NavbarBootstrap className={styles.nav}>
  <NavbarBootstrap.Brand as={Link} to="/">
    <img src={logo} alt="Logo" className={styles.logo} />
  </NavbarBootstrap.Brand>
  <div className={styles.left}>
    <div className={styles.iconHome}>
      <House className={styles.icon} />
      <Nav.Link as={Link} to="/categories" className={styles.categoriesText}>
        Home
      </Nav.Link>
    </div>
  </div>
 

        <Nav className={`ms-auto ${styles.right}`}>
          <div className={styles.iconContainer}>
            <BrightnessHighFill className={styles.icon} />
            <Nav.Link as={Link} to="/categories" className={styles.categoriesText}>
              Theme
            </Nav.Link>
          </div>
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
  );
};

export default Navbar;
