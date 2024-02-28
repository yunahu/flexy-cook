import styles from './index.module.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';

import { CardText } from 'react-bootstrap-icons';
import { Tools } from 'react-bootstrap-icons';
import { Envelope } from 'react-bootstrap-icons';
import { QuestionCircle } from 'react-bootstrap-icons';
import { EggFried } from 'react-bootstrap-icons';


const getResponsiveFontSize = () => {
   /* To calculate for a font size based on current screen size */
   let screenWidth = window.innerWidth * 0.01;
   let screenHeight = window.innerHeight * 0.01;
   return (screenWidth + screenHeight) * 0.9;
}

const Footer = () => {
   
   return (
      <>
         <style type="text/css"> {`
            .btn-footer {
               width: 100%;
               height: 100%;
               background-color: var(--dark-primary);
               font: bold ${getResponsiveFontSize()}px 'Noto Sans', sans-serif;
               color: var(--white);
            }

            .btn-footer:hover {
               background-color: var(--light);
               color: var(--dark-primary);
            }

            #logo {
               font: ${getResponsiveFontSize() * 1.4}px 'Comic Sans MS', sans-serif;
            }

         `} </style>

		<Container fluid className={styles.container}>
         <Row>    {/* 4 links + LOGO */}
            <Col sm>
               <Button variant='footer'><CardText /> User Policy</Button>
            </Col>
            <Col sm>
               <Button variant='footer'><Tools /> APIs</Button>
            </Col>
            <Col md={{order: 12}} lg={{order: 6}} className={styles.container}>
               <div id='logo'><EggFried /> FlexyCook</div>
            </Col>
            <Col sm>
               <Button variant='footer'><Envelope /> Contact</Button>
            </Col>
            <Col sm>
               <Button variant='footer'><QuestionCircle /> Help</Button>
            </Col>
         </Row>
         <Row>    {/* Copyright */}
            <Col xs={12}>
               <span>&copy; CPSC 2350 - Group 4</span>
            </Col>
         </Row>
      </Container>
   </>
   );
};

export default Footer;