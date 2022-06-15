import SimplePaper from '../SimplePaper/SimplePaper'
import styles from './Display.module.css'
//import { Button } from '@mui/material';
//import EditExpensePopup from '../Common/ExpensePopup';
import EditExpenseForm from "../Common/EditExpenseForm";
//import { useState } from 'react';
import "../../styles.css";
//import { supabase } from '../../config/supabaseClient';


export default function Display (props) {
    //const [buttonPopup, setButtonPopup] = useState(false); 
    return (
        <div className = {styles.Display}>
            <SimplePaper>
               
                <EditExpenseForm
                    user= {props.user}
                />
            </SimplePaper>
            
        </div>
    )
}
/* <Button onClick={() => setButtonPopup(true)}>
                    Add Expense
                </Button>
                
                <EditExpensePopup 
                trigger = {buttonPopup}
                setTrigger = {setButtonPopup}
                user= {props.user}
                />
                */