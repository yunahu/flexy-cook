/* eslint-disable react/prop-types */
import CardBootstrap from "react-bootstrap/Card";
import CookingInfo from "src/components/Cards/CookingInfo/CookingInfo";
import Tags from "src/components/Cards/Tags/Tags";

import styles from "./HorizontalCard.module.css";
import { trimIngredients } from "src/utils/spoonacularFunctions";
import { Row, Col, Stack } from "react-bootstrap";

const HorizontalCard = ({
  testid,
  imgURL,
  width,
  height,
  minHeight,
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
   * tags: array of objects, each has color, text as keys
   */
  return (
    <>
      <CardBootstrap
        data-testid={`lg_hori_card_${testid || 0}`}
        className={styles.hori_Card}
        style={{ width: width, height: height, minHeight: minHeight }}
        onClick={onClick}
      >
        <Row style={{ height: "100%" }}>
          <Col xs={5} className={styles.imgBlock}>
            <CardBootstrap.Img src={imgURL} className={styles.cardImg} />
          </Col>

          <Col xs={7} className={styles.cardBody}>
            <CardBootstrap.Body>
              <Stack direction="vertical" gap={2} className={styles.cardContent}>
                <CardBootstrap.Title>{title}</CardBootstrap.Title>

                <CardBootstrap.Text className={styles.cardText}>
                  <span className={styles.subtitle}>Ingredients:<br></br></span>
                  {ingredients ? trimIngredients(ingredients, 6) : ""}

                </CardBootstrap.Text>

                <CookingInfo size={size} time={time} calories={calories} />
                <Tags tags={tags} className={styles.tags}/>
              </Stack>
            </CardBootstrap.Body>
          </Col>
        </Row>
      </CardBootstrap>
    </>
  );
};

export default HorizontalCard;
