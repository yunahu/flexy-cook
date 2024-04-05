import { useState } from "react";
import { Col, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faEnvelope,
  faCircleQuestion,
} from "@fortawesome/free-regular-svg-icons";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { faHive } from "@fortawesome/free-brands-svg-icons";
import Modal from "react-bootstrap/Modal";
import styles from "./Footer.module.css";

const Footer = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <Stack className={styles.container} direction="vertical">
      <Col xxl>
        <Stack className={styles.footerItems} gap={2}>
          {/* Buttons to open modal */}
          <Button variant="footer" onClick={handleShow}>
            <FontAwesomeIcon icon={faFileLines} />
            &ensp;User Policy
          </Button>
          <Button variant="footer" onClick={handleShow}>
            <FontAwesomeIcon icon={faScrewdriverWrench} />
            &ensp;APIs
          </Button>
          <Link to="/" className={styles.logo}>
            <FontAwesomeIcon icon={faHive} />
            &ensp;FlexyCook
          </Link>
          <Button
            variant="footer"
            onClick={() =>
              (window.location = "mailto:cpsc2350group4@gmail.com")
            }
          >
            <FontAwesomeIcon icon={faEnvelope} />
            &ensp;Contact
          </Button>
          <Button
            variant="footer"
            onClick={() => {
              window.location.href = "https://github.com/yunahu/FlexyCook";
            }}
          >
            <FontAwesomeIcon icon={faCircleQuestion} />
            &ensp;Help
          </Button>
        </Stack>
      </Col>

      <Col xxl className={styles.logo}>
        <div>
          <hr></hr>
          <FontAwesomeIcon icon={faHive} />
          &ensp;FlexyCook
        </div>
      </Col>

      <Col xxl>
        <div className={styles.footerItems}>
          <hr className={styles.footerHr}></hr>
          <span className={styles.copyright}>&copy; CPSC 2350 - Group 4</span>
        </div>
      </Col>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>To be Announced</Modal.Title>
        </Modal.Header>
        <Modal.Body>This information will be announced later.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Stack>
  );
};

export default Footer;
