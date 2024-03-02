import Button from 'react-bootstrap/Button';
import CardBootstrap from 'react-bootstrap/Card';
import CookingInfo from 'src/components/Cards/CookingInfo';
import Tags from 'src/components/Cards/Tags';

import styles from './index.module.css';

const Large_Square_Card = (props) => {
   /**
    * info: object with equip, time, size as keys
    * tags: array of objects, each has color, text as keys
   */
   return (
      <>
         <CardBootstrap style={{ width:props.width }} className={'shadow-sm'}>

            <CardBootstrap.Img variant='top' src={props.imgURL} className={styles.cardImg} height={props.height}/>

            <CardBootstrap.Body>

               <CardBootstrap.Title>{props.title}</CardBootstrap.Title>

               <CardBootstrap.Text>{props.description}</CardBootstrap.Text>

               <CookingInfo info={props.info}/>
               <Tags tags={props.tags}/>

               <Button className={styles.goBtn} bg={styles.goBtn}>Check It Out</Button>

            </CardBootstrap.Body>

         </CardBootstrap>
      
      </>
   );
};

export default Large_Square_Card;