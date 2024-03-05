import { useState } from 'react';
import { Carousel } from 'react-bootstrap';

import SingleCarousel from './SingleCarousel/SingleCarousel';

import styles from './index.module.css';



const ControlledCarousel = (three_props) => {
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

   return (
      <>

      <Carousel activeIndex={index} onSelect={handleSelect} className={styles.banner}>

         <Carousel.Item><SingleCarousel props={three_props.item1} /></Carousel.Item>
         <Carousel.Item><SingleCarousel props={three_props.item2} /></Carousel.Item>
         <Carousel.Item><SingleCarousel props={three_props.item3} /></Carousel.Item>

      </Carousel>
      
      </>
   );
}

export default ControlledCarousel;