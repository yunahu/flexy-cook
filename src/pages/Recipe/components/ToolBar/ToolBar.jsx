import { Stack, Form, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesUp, faCartPlus, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import styles from './ToolBar.module.css';


const ToolBar = () => {

   return (
      <Stack direction='vertical' className={styles.toolBar} gap={0}>

         <OverlayTrigger
            placement='left'
            delay={{ show: 50, hide: 50 }}
            overlay={
               <Tooltip>Back To Top</Tooltip>
            }>
               
               <Button className={styles.tool}>
                  <FontAwesomeIcon icon={faAnglesUp} />
               </Button>

         </OverlayTrigger>

         {/** ------------------------------------------------------------------ */}

         <OverlayTrigger
            placement='left'
            delay={{ show: 50, hide: 50 }}
            overlay={
               <Tooltip>Convert To Cooking Steps</Tooltip>
            }>

               <Button className={styles.tool}>
                  <FontAwesomeIcon icon={faFileCirclePlus} />
               </Button>

         </OverlayTrigger>

         {/** ------------------------------------------------------------------ */}


         <OverlayTrigger
            placement='left'
            delay={{ show: 50, hide: 50 }}
            overlay={
               <Tooltip>Add To Shopping List</Tooltip>
            }>

               <Button className={styles.tool}>
                  <FontAwesomeIcon icon={faCartPlus}/>
               </Button>
         </OverlayTrigger>

         {/** ------------------------------------------------------------------ */}


         <OverlayTrigger
            placement='left'
            delay={{ show: 50, hide: 50 }}
            overlay={
               <Tooltip>Switch Units</Tooltip>
            }>
            <Stack direction='vertical' className={styles.tool} id={styles.unitSwitch} gap={2}>
               <Form.Check type='switch' />
               <span> Imperial Unit</span>
            </Stack>
         </OverlayTrigger>
         
      </Stack>


   );
};


export default ToolBar;