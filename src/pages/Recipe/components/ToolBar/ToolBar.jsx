import { Stack, Form, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesUp, faCartPlus, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import styles from './ToolBar.module.css';


const ToolBar = () => {

   return (
      <Stack direction='vertical' className={styles.toolBar}>

         <OverlayTrigger className={styles.tool}
            placement='left'
            delay={{ show: 50, hide: 50 }}
            overlay={
               <Tooltip className={styles.tooltip}>Back To Top</Tooltip>
            }>
            <Button><FontAwesomeIcon icon={faAnglesUp} /></Button>
         </OverlayTrigger>

         <OverlayTrigger className={styles.tool}
            placement='left'
            delay={{ show: 50, hide: 50 }}
            overlay={
               <Tooltip className={styles.tooltip}>Convert To Cooking Steps</Tooltip>
            }>
            <Button><FontAwesomeIcon icon={faFileCirclePlus} /></Button>
         </OverlayTrigger>

         <OverlayTrigger className={styles.tool}
            placement='left'
            delay={{ show: 50, hide: 50 }}
            overlay={
               <Tooltip className={styles.tooltip}>Add To Shopping List</Tooltip>
            }>
            <Button><FontAwesomeIcon icon={faCartPlus}/></Button>
         </OverlayTrigger>

         <OverlayTrigger className={styles.tool}
            placement='left'
            delay={{ show: 50, hide: 50 }}
            overlay={
               <Tooltip className={styles.tooltip}>Switch Units</Tooltip>
            }>
            <Stack direction='vertical'>
               <Form.Check type='switch' />
               <span> Imperial Unit</span>
            </Stack>
         </OverlayTrigger>
         
      </Stack>


   );
};


export default ToolBar;