import Button from "react-bootstrap/Button";
import CardBootstrap from "react-bootstrap/Card";
import CookingInfo from "../Cards/CookingInfo/CookingInfo";
import Tags from "../Cards/Tags/Tags";

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
  //key
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
        height={height}
      />

      <CardBootstrap.Body>
        <CardBootstrap.Title>{title}</CardBootstrap.Title>
        <CardBootstrap.Subtitle>Ingredients</CardBootstrap.Subtitle>
        <CardBootstrap.Text>{ingredients}</CardBootstrap.Text>

        <CookingInfo size={size} time={time} calories={calories} />
        <Tags tags={tags} />

        <Button className={styles.goBtn} bg={styles.goBtn}>
          Check It Out
        </Button>
      </CardBootstrap.Body>
    </CardBootstrap>
  );
};

export default LargeSquareCard;
