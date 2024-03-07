import Dropdown from "react-bootstrap/Dropdown";
import styles from "./DropdownMenu.module.css";

const map = {
  info: styles["btn-info"],
  success: styles["btn-success"],
  //if you want to add more colors, you can add more
};

// exampleItems{
//   title: "Search"
//   ref: "/search"
//   key: "goSearch"
// }

const DropdownMenu = ({ buttonTitle, items, background = "success" }) => {
  return (
    // if you want to add more props, you can add
    <Dropdown className={styles.container}>
      <Dropdown.Toggle
        variant={background}
        className={`${map[background]}`}
        id="dropdown-basic"
      >
        {buttonTitle}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {items.map((item) => (
          <Dropdown.Item key={item.key} href={item.ref}>
            {item.title}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownMenu;
