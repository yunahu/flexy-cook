/* eslint-disable react/prop-types */
import CardBootstrap from 'react-bootstrap/Card';
import Tag from 'src/components/Tag/Tag';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKitchenSet } from '@fortawesome/free-solid-svg-icons';
import { faCarrot } from '@fortawesome/free-solid-svg-icons';

import styles from './CookingStep.module.css';
import { Row, Col } from 'react-bootstrap';
import { Stack } from 'react-bootstrap';

// Extract equipment & ingredient names and form a string for diaplying
const displayList = (objArr) => {
   let strList = "";
   objArr.forEach(obj => {
      strList += obj.name + ", ";
   });
   return strList;
}

// Fill the step number tag with different colors according to the step number
const colorByNum = (num) => {
   switch (num % 7) {
      case 1:
         return 'primary';
      case 2:
         return 'secondary';
      case 3:
         return 'info';
      case 4:
         return 'success';
      case 5:
         return 'warning';
      case 6:
         return 'danger';
      case 7:
         return 'light';
      case 0:
         return 'dark';
      default:
         return 'primary';
   }
};

const CookingStep = ({height, number, image, step, equipment, ingredients }) => {
   return (
      <>
         <CardBootstrap className={styles.stepsCard} height={height}>
            <Row>
               <Col xs={4} className={styles.imgBlock}>
                  <CardBootstrap.Img src={image} className={styles.cardImg}/>
               </Col>

               <Col xs={8} className={styles.cardText}>
                  <CardBootstrap.Body className={styles.cardBody}>
                     <Stack direction='horizontal'> {/** This stack is to put step number to the right & limit text width */}
                        <Col>
                           <CardBootstrap.Title>{step}</CardBootstrap.Title>

                           <CardBootstrap.Text>
                              <FontAwesomeIcon icon={faKitchenSet} />&ensp;Equipments: {displayList(equipment)} ...
                              <br />
                              <FontAwesomeIcon icon={faCarrot} />&ensp;Ingredients: {displayList(ingredients)} ...
                           </CardBootstrap.Text>
                        </Col>
                        
                        <Col xs={1}>
                           <Tag title={number} bg={colorByNum(number)} className={styles.stepNum}/>
                        </Col>
                     </Stack>
                  </CardBootstrap.Body>
               </Col>
            </Row>
         </CardBootstrap>
      </>
   );

};

export default CookingStep;