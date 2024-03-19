/* eslint-disable react/prop-types */
import { Card } from "react-bootstrap";

import CookingInfo from "src/components/Cards/CookingInfo/CookingInfo";
import Tags from "src/components/Cards/Tags/Tags";

import styles from "./RecipeBanner.module.css";

const RecipeBanner = ({
   imgURL,
   title,
   ingredients,
   size,
   time,
   calories,
   tags
}) => {
   return (

      <Card className={styles.banner}>
         <Card.Img src={imgURL} className={styles.bgImg} />

         <Card.ImgOverlay className={styles.caption}>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
               Ingredients: <br></br>
               {ingredients}
            </Card.Text>
            <Card.Text>
               <CookingInfo size={size} time={time} calories={calories} />
               <Tags tags={tags} />
            </Card.Text>
         </Card.ImgOverlay>
      </Card>
   );
}

export default RecipeBanner;
