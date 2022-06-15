//this is an unused component!
import React from "react";
import EditExpenseForm from "./EditExpenseForm";

const EditExpensePopup = props => {;
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup_inner" >
                <div className="addExpenseHeader"> Edit expense </div>
                <EditExpenseForm
                    user={props.user}
                    amount={props.amount}
                    settings={props.settings}
                />
                <button id="closePopup" onClick={() =>props.setTrigger(false)}>
                    {" "}
                    X{" "}
                </button>
            </div>
        </div>
    ) :"";
};

export default EditExpensePopup;