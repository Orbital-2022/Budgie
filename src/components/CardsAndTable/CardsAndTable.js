
import { useState, useEffect } from 'react';
import Box from "./Box/Box";
import styles from "./Cards.module.css";
import { supabase } from "../../config/supabaseClient";
//import ExpenseTable from "./ExpenseTable/ExpenseTable";

function IncomeCard() {

    return (
        <Box>
            <h2>Total income:</h2>
        </Box>
    )
}

function ExpenseCard() {

    return (
        <Box>
            <h2>Total expense:</h2>
        </Box>
    )
}


function CardsAndTable() {

    return (
    <div className={styles.container}>
          <h1>Your Balance: </h1>
          <IncomeCard />
          <ExpenseCard />     
     </div>

    );
  }
  
export default CardsAndTable;

