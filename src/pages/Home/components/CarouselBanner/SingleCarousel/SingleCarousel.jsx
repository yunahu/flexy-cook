/* eslint-disable react/prop-types */
import { Carousel, Image } from "react-bootstrap";

import CookingInfo from "src/components/Cards/CookingInfo/CookingInfo";
import Tags from "src/components/Cards/Tags/Tags";
import ModifiedButton from "src/components/ModifiedButton/ModifiedButton";

import styles from "./SingleCarousel.module.css";

const SingleCarousel = ({
  testid,
  imgURL,
  title,
  servings,
  time,
  calories,
  tags,
  onClick,
}) => {
  /**
   * props {
   *    img: 'url',
   *    title: 'Sample Title',
   *    cookingInfo: {
   *       equip: 'Oven',
   *       time: 40,
   *       size: 2
   *    },
   *    tags: [
   *       [0]: {
   *          text: 'Tag 1',
   *          type: 'primary'
   *       },
   *       [1]: {
   *          text: 'Tag 2',
   *          type: 'success'
   *       },
   *       [2]: {
   *          text: 'Tag 3',
   *          type: 'warning'
   *       }
   *    ]
   * }
   */
  return (
    <>
      <Image src={imgURL} className={styles.img} rounded />

      <Carousel.Caption
        className={styles.caption}
        data-testid={`carousel_banner_${testid || 0}`}
      >
        <h3>{title}</h3>
        <CookingInfo size={servings} time={time} calories={calories} />
        <Tags tags={tags} />

        <ModifiedButton
          className={styles.goBtn}
          title={"Check It Out"}
          variant="light"
          onClick={onClick}
        />
      </Carousel.Caption>
    </>
  );
};

export default SingleCarousel;
