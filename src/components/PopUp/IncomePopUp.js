import { Button } from '@mui/material';
import React from 'react';
import EditIncomeForm from "../Common/EditIncomeForm";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../../styles.css";



export default function IncomePopup (props) {
    //const [buttonPopup, setButtonPopup] = useState(false); 
    return (

               <Popup className= "simplepopup" trigger={<Button className='add'>Add Income</Button>} 
                position="right center"
                modal
                >
                {close => (
                    <div>
                <button className="close" position="right top" onClick={close}>
                     &times;
                </button>
               <EditIncomeForm
                    user= {props.user}
                />
                </div>
                )}
                </Popup>

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