import { Button, Carousel, Image } from 'react-bootstrap';

import CookingInfo from 'src/components/Cards/CookingInfo/CookingInfo';
import Tags from 'src/components/Cards/Tags/Tags';

import styles from './SingleCarousel.module.css';

const SingleCarousel = ({props}) => {
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
         <Image src={props.imgURL} className={styles.img} height={props.height} rounded/>

         <Carousel.Caption className={styles.caption}>
      
               <h3>{props.title}</h3>
               <CookingInfo info={props.info}/>
               <Tags tags={props.tags}/>

               <Button className={styles.goBtn} bg={styles.goBtn}>Check It Out</Button>

         </Carousel.Caption>
      </>
   );
}

export default SingleCarousel;