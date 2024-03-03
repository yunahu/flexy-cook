import Stack from "react-bootstrap/Stack";

import { Container } from "react-bootstrap";
import styles from "./CookingInfo.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faKitchenSet } from "@fortawesome/free-solid-svg-icons";

const CookingInfo = ({ size, time, calories }) => {
  /*
      info {
         equip: 'Oven',
         time: 40,
         size: 2
      }
   */
  return (
    <Stack direction="horizontal" className={styles.wrapper}>
      <Container className={styles.col}>
        <FontAwesomeIcon icon={faKitchenSet} />
        &ensp;{calories} kcal
      </Container>
      <Container className={styles.col}>
        <FontAwesomeIcon icon={faClockRotateLeft} />
        &ensp;{time} minutes
      </Container>
      <Container className={styles.col}>
        <FontAwesomeIcon icon={faUtensils} />
        &ensp;{size} {size > 1 ? "servings" : "serving"}
      </Container>
    </Stack>
  );
};

export default CookingInfo;
