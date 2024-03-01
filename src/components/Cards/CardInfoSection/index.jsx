import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

import { Container } from 'react-bootstrap';
import styles from "./index.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faKitchenSet } from '@fortawesome/free-solid-svg-icons';


const InfoSection = ({info, tags}) => {
   /*
      info {
         equip: 'Oven',
         time: 40,
         size: 2
      },
      tags [
         0: {
            text: 'Tag 1',
            type: 'primary'
         },
         1: {
            text: 'Tag 2',
            type: 'success'
         },
         2: {
            text: 'Tag 3',
            type: 'warning'
         }
      ]
   */
   return (
      <Container className={styles.wrapper}>

         <Stack direction='horizontal'>

            <Container className={styles.col}><FontAwesomeIcon icon={faKitchenSet} />&ensp;{info.equip}</Container>
            <Container className={styles.col}><FontAwesomeIcon icon={faClockRotateLeft} />&ensp;{info.time}</Container>
            <Container className={styles.col}><FontAwesomeIcon icon={faUtensils} />&ensp;{info.size}</Container>

         </Stack>
         <Stack direction='horizontal' gap={2}>
            
            <Badge bg={tags[0].color}>{tags[0].text}</Badge>
            <Badge bg={tags[1].color}>{tags[1].text}</Badge>
            <Badge bg={tags[2].color}>{tags[2].text}</Badge>

         </Stack>

      </Container>
   );
}

export default InfoSection;