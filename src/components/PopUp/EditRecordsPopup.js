import React from 'react';
import EditRecordsForm from "../Common/EditRecordsForm";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../../styles.css";
import EditIcon from '@mui/icons-material/Edit';
import {
    IconButton
} from '@mui/material';

export default function EditPopup (props) {
    return (

               <Popup className= "simplepopup"
                trigger={<IconButton> <EditIcon /></IconButton>} 
                position="right center"
                modal
                >
                {close => (
                    <div>
                <button id="closePopup3" position="right top" onClick={close}>
                     &times;
                </button>
               <EditRecordsForm
                    user = {props.user}
                    rid = {props.rid}
                />
                </div>
                )}
                </Popup>

    )
}