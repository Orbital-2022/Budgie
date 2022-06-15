import SimplePaper from '../SimplePaper/SimplePaper'
import styles from './Display.module.css'
import { Button } from '@mui/material';
import React from 'react';
//import EditExpensePopup from '../Common/ExpensePopup';
import EditExpenseForm from "../Common/EditExpenseForm";
//import { useState } from 'react';
import "../../styles.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
//import { supabase } from '../../config/supabaseClient';


export default function Display (props) {
    //const [buttonPopup, setButtonPopup] = useState(false); 
    return (
        <div className = {styles.Display}>
            <SimplePaper>
               <Popup className= "simplepopup" trigger={<Button className= "submitbtnmedium">Add Expense</Button>} 
                position="right center"
                modal
                >
                {close => (
                    <div>
                <button className="close" position="right top" onClick={close}>
                     &times;
                </button>
               <EditExpenseForm
                    user= {props.user}
                />
                </div>
                )}
                </Popup>
            </SimplePaper>
            
        </div>
    )
}
//failed attempt to make it a popup
/* <Button onClick={() => setButtonPopup(true)}>
                    Add Expense
                </Button>
                
                <EditExpensePopup 
                trigger = {buttonPopup}
                setTrigger = {setButtonPopup}
                user= {props.user}
                />
                */