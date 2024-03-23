/* eslint-disable react/prop-types */
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./NavDropdownMenu.module.css";
import { CardList } from "react-bootstrap-icons";

const map = {
  info: styles["btn-info"],
  success: styles["btn-success"],
  //if you want to add more colors, you can add more
};

// exampleItems{
//   icon:
//   title: "Search"
//   ref: "/search"
//   key: "goSearch"
// }

const NavDropdownMenu = ({
  drop,
  buttonTitle,
  items,
  background = "success",
}) => {

  return (
    // if you want to add more props, you can add
    <Dropdown className={`${styles.container}`} drop={drop}>
        <Dropdown.Toggle
          variant={background}
          className={`${map[background]}`}
          id="dropdown-basic"
        >
          <CardList className={` ${styles.cardIcon}`} />
          <span className={styles.iconText}>{buttonTitle}</span>
        </Dropdown.Toggle>
      <Dropdown.Menu>
         
        {items.map((item, index) => (
          <>
            <Dropdown.Item
              key={item.key + index}
              href={item.ref}
              className={styles.itemContainer}
							onClick={item.onClick}
            >
              <span className={styles.icon}>
                {item.icon ? item.icon : null}
              </span>
              <span className={styles.text}>{item.title}</span>
            </Dropdown.Item>
            {index !== items.length - 1 && <Dropdown.Divider />}
          </>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavDropdownMenu;
