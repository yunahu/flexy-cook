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
      strList += obj.name;
   });
   return strList;
}

// Fill the step number tag with random colors
// const randomColor = (tagItem) => {

// };

const CookingStep = ({step_info}) => {
   return (
      <>
         <CardBootstrap className={styles.stepsCard} height={step_info.height}>
            <Row>
               <Col xs={4} className={styles.imgBlock}>
                  <CardBootstrap.Img src={step_info.equipment[0].image} className={styles.cardImg}/>
               </Col>

               <Col xs={8} className={styles.cardText}>
                  <CardBootstrap.Body className={styles.cardBody}>
                     <Stack direction='horizontal'> {/** This stack is to put step number to the right & limit text width */}
                        <Col>
                           <CardBootstrap.Title>{step_info.step}</CardBootstrap.Title>

                           <CardBootstrap.Text>
                              <FontAwesomeIcon icon={faKitchenSet} />&ensp;Equipments: {displayList(step_info.equipment)} ...
                              <br />
                              <FontAwesomeIcon icon={faCarrot} />&ensp;Ingredients: {displayList(step_info.ingredients)} ...
                           </CardBootstrap.Text>
                        </Col>
                        
                        <Col xs={1}>
                           <Tag title={step_info.number} bg={step_info.tagbg} className={styles.stepNum}/>
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