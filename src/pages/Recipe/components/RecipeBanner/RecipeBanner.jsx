/* eslint-disable react/prop-types */
import { Card } from "react-bootstrap";

import CookingInfo from "src/components/Cards/CookingInfo/CookingInfo";
import Tags from "src/components/Cards/Tags/Tags";

import styles from "./RecipeBanner.module.css";

const RecipeBanner = ({
  imgURL,
  title,
  ingredients,
  nutrients,
  size,
  time,
  calories,
  tags,
}) => {
  console.log(tags);
  return (
    <Card className={styles.banner} data-testid="recipe_banner">
      <Card.Img
        src={imgURL}
        className={styles.bgImg}
        data-testid="banner_img"
      />

      <Card.ImgOverlay className={styles.caption}>
        <Card.Title>{title}</Card.Title>

        <Card.Text>
          Ingredients: <br></br>
          <div className={styles.ingredients}>{ingredients}</div>
        </Card.Text>
        <Card.Text>
          Nutrients: <br></br>
          <div className={styles.nutrients}>{nutrients}</div>
        </Card.Text>
        <Card.Text>
          <CookingInfo size={size} time={time} calories={calories} />
          <Tags tags={tags} />
        </Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
};

export default RecipeBanner;
