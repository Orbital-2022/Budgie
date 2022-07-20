//import { Button } from '@mui/material';
import React from 'react';
import EditIncome from "../Income/IncomeEditForm";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../../styles.css";
import EditIcon from '@mui/icons-material/Edit';
import {
    IconButton
} from '@mui/material';

export default function EditIncomeRow (props) {
    return (

               <Popup className= "simplepopup"
                trigger={<IconButton> <EditIcon /></IconButton>} 
                position="right center"
                modal
                >
                {close => (
                    <div>
                <button id="closePopup4" position="right top" onClick={close}>
                     &times;
                </button>
               <EditIncome
                    user = {props.user}
                    rid = {props.rid}
                />
                </div>
                )}
                </Popup>

    )
}