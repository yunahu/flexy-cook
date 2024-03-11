import { useState } from "react";
import { Carousel } from "react-bootstrap";

import SingleCarousel from "./SingleCarousel/SingleCarousel";

import styles from "./CarouselBanner.module.css";

const ControlledCarousel = (prop1, prop2, prop3) => {
  /**
   * three_props {
   *    item1: { object for carousel 1 },
   *    item2: { object for carousel 2 },
   *    item3: { object for carousel 3 }
   * }
   */
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const first = prop1.prop1;
  const second = prop1.prop2;
  const third = prop1.prop3;

  return (
    <>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        className={styles.banner}
      >
        <Carousel.Item>
          <SingleCarousel
            imgURL={first.imgURL}
            title={first.title}
            servings={first.size}
            time={first.time}
            calories={first.calories}
            tag={first.tags}
          />
        </Carousel.Item>
        <Carousel.Item>
          <SingleCarousel
            imgURL={second.imgURL}
            title={second.title}
            servings={second.size}
            time={second.time}
            calories={second.calories}
            tag={second.tags}
          />
        </Carousel.Item>
        <Carousel.Item>
          <SingleCarousel
            imgURL={third.imgURL}
            title={third.title}
            servings={third.size}
            time={third.time}
            calories={third.calories}
            tag={third.tags}
          />
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default ControlledCarousel;
