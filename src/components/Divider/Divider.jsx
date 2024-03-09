/* eslint-disable react/prop-types */
import { Stack } from "react-bootstrap";
import styles from './Divider.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';



const Divider = ({
   width,
   label,
   variant
   
}) => {
   if ((label == "") && (variant == "")) {
      return (
         <><hr></hr></>
      );
   } else if ((label == "") && (variant == 'up')) {
      return (
         <Stack direction='vertical' style={{ width: width }} className={styles.container}>
            <FontAwesomeIcon icon={faChevronUp} />
            <hr></hr>
         </Stack>
      );
   } else if ((label == "") && (variant == 'down')) {
      return (
         <Stack direction='vertical' style={{ width: width }} className={styles.container}>
            <hr></hr>
            <FontAwesomeIcon icon={faChevronDown} />
         </Stack>
      );
   } else if (variant == 'up') {
      return (
         <Stack direction='vertical' style={{ width: width }} className={styles.container}>
            <FontAwesomeIcon icon={faChevronUp} />
            <Stack direction='horizontal'>
               <hr></hr>
               <span className={styles.label}>{label}</span>
               <hr></hr>
            </Stack>
         </Stack>
      );
   } else {
      return (
         <Stack direction='vertical' style={{ width: width }} className={styles.container}>
            <Stack direction='horizontal'>
               <hr></hr>
               <span className={styles.label}>{label}</span>
               <hr></hr>
            </Stack>
            <FontAwesomeIcon icon={faChevronDown} />
         </Stack>
      );
   }
};


export default Divider;