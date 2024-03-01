import Button from 'react-bootstrap/Button';
import CardBootstrap from 'react-bootstrap/Card';
import InfoSection from 'src/components/Cards/InfoSection';

import styles from './index.module.css';

const VerticalCard = (props) => {
   /**
    * info: object with equip, time, size as keys
    *  tags: array of objects, each has color, text as keys
   */
   return (
      <>
         <CardBootstrap style={{ width:props.width, height:props.height }}>

            <CardBootstrap.Img variant='top' src={props.imgURL} className={styles.cardImg}/>

            <CardBootstrap.Body>

               <CardBootstrap.Title>{props.title}</CardBootstrap.Title>

               <CardBootstrap.Text>{props.description}</CardBootstrap.Text>

               <InfoSection info={props.info} tags={props.tags}/>

               <Button className={styles.goBtn} bg={styles.goBtn}>Check It Out</Button>

            </CardBootstrap.Body>

         </CardBootstrap>
      
      </>
   );
};

export default VerticalCard;