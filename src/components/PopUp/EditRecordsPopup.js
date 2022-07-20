import { Button } from '@mui/material';
import React from 'react';
import EditIncomeForm from "../Common/EditIncomeForm";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../../styles.css";



export default function IncomePopup (props) {
    return (

               <Popup className= "simplepopup" trigger={<Button className='add'>Add Income</Button>} 
                position="right center"
                modal
                >
                {close => (
                    <div>
                <button id="closePopup2" position="right top" onClick={close}>
                     &times;
                </button>
               <EditIncomeForm
                    user = {props.user}
                    id = {props.id}
                />
                </div>
                )}
                </Popup>

    )
}