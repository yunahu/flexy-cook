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
   return (screenWidth + screenHeight) * 1.1;
}

const Footer = () => {
   
   return (
      <>
         <style type="text/css"> {`
            .btn-footer {
               width: 100%;
               height: 8vh;
               max-height: 60px;
               background-color: var(--dark-primary);
               font: bold 1.2em 'Noto Sans', sans-serif;
               color: var(--white);
            }

            .btn-footer:hover {
               background-color: var(--light);
               color: var(--dark-primary);
            }

            #logo {
               font: 1.3em 'Comic Sans MS', sans-serif;
            }

            @media screen and (max-width: 540px) {
               #logo { display: none; }
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
            <Col sm>
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
            <Col xs>
               <span>&copy; CPSC 2350 - Group 4</span>
            </Col>
         </Row>
      </Container>
   </>
   );
};

export default Footer;