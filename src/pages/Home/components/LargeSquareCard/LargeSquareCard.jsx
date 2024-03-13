/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import CardBootstrap from "react-bootstrap/Card";
import CookingInfo from "src/components/Cards/CookingInfo/CookingInfo";
import Tags from "src/components/Cards/Tags/Tags";
import ModifiedButton from "src/components/ModifiedButton/ModifiedButton";

import styles from "./LargeSquareCard.module.css";
import { Stack } from "react-bootstrap";

const LargeSquareCard = ({
  imgURL,
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
      <CardBootstrap className={styles.lg_sq_card}>
        <Stack direction="vertical">
          <CardBootstrap.Img
            variant="top"
            src={imgURL}
            className={styles.cardImg}
          />

          <CardBootstrap.Body>
            <Stack direction="vertical" className={styles.cardBody} gap={2}>
              <CardBootstrap.Title>{title}</CardBootstrap.Title>

              <Stack direction="vertical" gap={1}>
                <CardBootstrap.Subtitle>Ingredients</CardBootstrap.Subtitle>
                <CardBootstrap.Text>{ingredients}</CardBootstrap.Text>
              </Stack>

              <CookingInfo size={size} time={time} calories={calories} />
              <Tags tags={tags} />
            </Stack>

            <ModifiedButton
              className={styles.goBtn}
              title={"Check It Out"}
              variant="light"
              onClick={onClick}
            />
          </CardBootstrap.Body>
        </Stack>
      </CardBootstrap>
    </>
  );
};

export default LargeSquareCard;
