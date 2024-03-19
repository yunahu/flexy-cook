/* eslint-disable react/prop-types */
import ModifiedButton from "src/components/ModifiedButton/ModifiedButton.jsx";
import CardBootstrap from "react-bootstrap/Card";
import CookingInfo from "src/components/Cards/CookingInfo/CookingInfo";
import Tags from "src/components/Cards/Tags/Tags";

import styles from "./SearchCard.module.css";

const SearchCard = (props, testid) => {
  return (
    <>
      <CardBootstrap className={styles.card} data-testid={`card_${testid}`}>
        <CardBootstrap.Img
          variant="top"
          src={props.imgURL}
          className={styles.cardImg}
          height={props.height}
        />

        <CardBootstrap.Body>
          <CardBootstrap.Title>{props.title}</CardBootstrap.Title>

          <CardBootstrap.Text className={styles.description}>
            {props.description}
          </CardBootstrap.Text>

          <CookingInfo
            size={props.size}
            time={props.time}
            calories={props.calories}
          />
          <Tags tags={props.tags} />

          <ModifiedButton
            className={styles.goBtn}
            title={"Check It Out"}
            variant="light"
            onClick={props.onClick}
          />
        </CardBootstrap.Body>
        <CardBootstrap.Footer className={styles.footer}>
          <a href="" className={styles.footerLink}>
            Check It Out
          </a>
        </CardBootstrap.Footer>
      </CardBootstrap>
    </>
  );
};

export default SearchCard;
