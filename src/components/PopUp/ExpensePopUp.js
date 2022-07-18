import { Button } from '@mui/material';
import React from 'react';
import EditExpenseForm from "../Common/EditExpenseForm";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



export default function ExpensePopup (props) {
    return (

               <Popup className= "simplepopup" trigger={<Button className= "submitbtnmedium">Add Expense</Button>} 
                position="right center"
                modal
                >
                {close => (
                    <div>
                <button id="closePopup" position="right top" onClick={close}>
                     &times;
                </button>
               <EditExpenseForm
                    user= {props.user}
                />
                </div>
                )}
                </Popup>

    )
}