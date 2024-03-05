import Stack from 'react-bootstrap/Stack';

import { Container } from 'react-bootstrap';
import styles from "./index.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faKitchenSet } from '@fortawesome/free-solid-svg-icons';


const CookingInfo = ({info}) => {
   /*
      info {
         equip: 'Oven',
         time: 40,
         size: 2
      }
   */
   return (
         <Stack direction='horizontal' className={styles.wrapper}>

            <Container className={styles.col}><FontAwesomeIcon icon={faKitchenSet} />&ensp;{info.equip}</Container>
            <Container className={styles.col}><FontAwesomeIcon icon={faClockRotateLeft} />&ensp;{info.time}</Container>
            <Container className={styles.col}><FontAwesomeIcon icon={faUtensils} />&ensp;{info.size}</Container>

         </Stack>

   );
}

export default CookingInfo;