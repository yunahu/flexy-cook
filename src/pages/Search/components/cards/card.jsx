import Button from 'react-bootstrap/Button';
import CardBootstrap from 'react-bootstrap/Card';
import CookingInfo from 'src/components/Cards/CookingInfo/CookingInfo';
import Tags from 'src/components/Cards/Tags/Tags';

import styles from './card.module.css';

const Large_Square_Card = (props) => {
  
   return (
      <>
         <CardBootstrap  className={styles.card}>

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