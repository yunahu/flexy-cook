/* eslint-disable react/prop-types */
import { Stack } from "react-bootstrap";
import styles from './Divider.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';



const Divider = ({
   width,
   labelWidth,
   label,

}) => {
   if (label != "") {
      return(
         <>
            <Stack style={{ width: width }} direction='vertical' className={styles.container}>
               <hr></hr>
               <FontAwesomeIcon icon={faChevronDown} />
               <span className={styles.label} style={{ width: labelWidth }}>{label}</span>
            </Stack>

         </>
      );
   } else {
      return (
         <>
            <Stack style={{ width: width }} direction='vertical' className={styles.container}>
               <hr></hr>
               <FontAwesomeIcon icon={faChevronDown} />
            </Stack>
         </>
      );
   }
};


export default Divider;