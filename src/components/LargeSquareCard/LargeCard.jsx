import Button from "react-bootstrap/Button";
import CardBootstrap from "react-bootstrap/Card";
import CookingInfo from "../Cards/CookingInfo/CookingInfo";
import Tags from "../Cards/Tags/Tags";
import ModifiedButton from "src/components/ModifiedButton/ModifiedButton";

import styles from "./LargeCard.module.css";

const LargeSquareCard = ({
  imgURL,
  width,
  height,
  title,
  ingredients,
  tags,
  time,
  size,
  calories,
  onClick,
}) => {
  /**
   * info: object with equip, time, size as keys
   *  tags: array of objects, each has color, text as keys
   */
  return (
    <CardBootstrap style={{ width: width }} className={"shadow-sm"}>
      <CardBootstrap.Img
        variant="top"
        src={imgURL}
        className={styles.cardImg}
      />

      <CardBootstrap.Body>
        <CardBootstrap.Title>{title}</CardBootstrap.Title>
        <CardBootstrap.Subtitle>Ingredients</CardBootstrap.Subtitle>
        <CardBootstrap.Text>{ingredients}</CardBootstrap.Text>

        <CookingInfo size={size} time={time} calories={calories} />
        <Tags tags={tags} />

        <ModifiedButton
          className={styles.goBtn}
          title={"Check It Out"}
          variant="light"
          onClick={onClick}
        />
      </CardBootstrap.Body>
    </CardBootstrap>
  );
};

export default LargeSquareCard;
