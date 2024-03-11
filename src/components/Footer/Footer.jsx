import styles from './Footer.module.css';

import { Col, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faEnvelope, faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { faHive } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
   
   return (
      <Stack className={styles.container} direction='vertical'>
         <Col xxl>
            <Stack className={styles.footerItems} gap={2}>
               <Button variant='footer'><FontAwesomeIcon icon={faFileLines} />&ensp;User Policy</Button>
               <Button variant='footer'><FontAwesomeIcon icon={faScrewdriverWrench} />&ensp;APIs</Button>
               
               <div className={styles.logo}>
                  <FontAwesomeIcon icon={faHive} />&ensp;FlexyCook
               </div>
               
               <Button variant='footer'><FontAwesomeIcon icon={faEnvelope} />&ensp;Contact</Button>
               <Button variant='footer'><FontAwesomeIcon icon={faCircleQuestion} />&ensp;Help</Button>
            </Stack>
         </Col>

         <Col xxl className={styles.logo}>
            <div>
               <hr></hr>
               <FontAwesomeIcon icon={faHive} />&ensp;FlexyCook
            </div>
         </Col>

         <Col xxl>
            <div className={styles.copyright}>
               <hr></hr>
               &copy; CPSC 2350 - Group 4
            </div>
         </Col>
      </Stack>
   );
};

export default Footer;