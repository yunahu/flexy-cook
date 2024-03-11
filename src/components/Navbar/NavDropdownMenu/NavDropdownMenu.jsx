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
  className,
  background = "success",
}) => {
  return (
    // if you want to add more props, you can add
    <Dropdown className={`${styles.container} ${className}`} drop={drop}>
      <div className={styles.iconContainer}>
        <Dropdown.Toggle
          variant={background}
          className={`${map[background]}`}
          id="dropdown-basic"
        >
          <CardList className={` ${styles.cardIcon}`} />
          <span className={styles.iconText}>{buttonTitle}</span>
        </Dropdown.Toggle>
      </div>
      <Dropdown.Menu>
        {items.map((item, index) => (
          <>
            <Dropdown.Item
              key={item.key}
              href={item.ref}
              className={styles.itemContainer}
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
