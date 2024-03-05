import React from 'react';
import { Nav, Navbar as NavbarBootstrap, NavDropdown, InputGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import { CardList, FilePostFill, GearWideConnected, PersonCircle, House, Search } from 'react-bootstrap-icons';
import { BrightnessHighFill } from 'react-bootstrap-icons';
import { CartPlusFill } from 'react-bootstrap-icons';


import logo from './img/logo.png';

const Navbar = () => {
  const handleSearch = (event) => {
    event.preventDefault();
    history.push('../pages/Search'); // Navigate to the search page
  };

  return (
    <div className={styles.container}>
      <NavbarBootstrap className={styles.nav}>
        <NavbarBootstrap.Brand as={Link} to="/">
          <div className={styles.iconHome}>
            <House className={styles.icon} />
            <Nav.Link as={Link} to="/categories" className={styles.categoriesText}>
              Home
            </Nav.Link>
          </div>
          
          <img src={logo} alt="Logo" className={styles.logo} />
        </NavbarBootstrap.Brand>
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
  handleSearch();
};


export default Navbar;