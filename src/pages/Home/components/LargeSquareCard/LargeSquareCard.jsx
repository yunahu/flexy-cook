/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import CardBootstrap from "react-bootstrap/Card";
import CookingInfo from "src/components/Cards/CookingInfo/CookingInfo";
import Tags from "src/components/Cards/Tags/Tags";

import styles from "./LargeSquareCard.module.css";
import { Container, Stack } from "react-bootstrap";

const LargeSquareCard = ({
  imgURL,
  title,
  ingredients,
  tags,
  time,
  size,
  calories
}
) => {
  /**
   * info: object with equip, time, size as keys
   * tags: array of objects, each has color, text as keys
   */
  return (
    <>
      <CardBootstrap className={styles.lg_sq_card}>
         <Stack direction='vertical'>
            <CardBootstrap.Img variant="top"
               src={imgURL}
               className={styles.cardImg}
            />

            <CardBootstrap.Body>
               <Container className={styles.cardBody}>
                  <CardBootstrap.Title>{title}</CardBootstrap.Title>

                  <CardBootstrap.Subtitle>Ingredients</CardBootstrap.Subtitle>
                  <CardBootstrap.Text>{ingredients}</CardBootstrap.Text>

                  <CookingInfo size={size} time={time} calories={calories} />
                  <Tags tags={tags} />
               </Container>

               <Button className={styles.goBtn} bg={styles.goBtn}>
                  Check It Out
               </Button>
               
            </CardBootstrap.Body>
         </Stack>
      </CardBootstrap>
    </>
  );
};

export default LargeSquareCard;
