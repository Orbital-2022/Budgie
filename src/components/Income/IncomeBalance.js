import { useState,useEffect } from "react";
import { supabase } from "../../config/supabaseClient";
import Box from "../Box/Box";
import { format, startOfMonth, endOfMonth } from 'date-fns';


export default function IncomeBalance() {
    const [expense, setExpense] = useState([]);
    const [income, setIncome] = useState([]);
    const user = supabase.auth.user();

    const now = new Date();
    const start = format(startOfMonth(now), "yyyy-MM-dd");
    const end = format(endOfMonth(now), "yyyy-MM-dd");
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { fetchExpense().catch(console.error);}, [expense]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { fetchIncome().catch(console.error);}, [income]);
    useEffect(() => {
        const subscription = supabase
            .from('expenses')
            .on('*', data => {
            console.log('Change received!', data)
            })
            .subscribe()
    
        return () => {
          supabase.removeSubscription(subscription)
        }
      }, []);

      useEffect(() => {
        const subscription = supabase
            .from('incomes')
            .on('*', data => {
            console.log('Change received!', data)
            })
            .subscribe()
    
        return () => {
          supabase.removeSubscription(subscription)
        }
      }, []);

    const fetchExpense = async () => {
      let { data: expense, error } = await supabase
          .from('expenses')
          .select("*")
          .eq('user_id',user.id)
          .lte('expense_date', end)
          .gte('expense_date', start)
  
      if (error) console.log("error", error);
      else setExpense(expense);
    };

    const fetchIncome = async () => {
        let { data: income, error } = await supabase
            .from('incomes')
            .select("*")
            .eq('user_id',user.id)
            .lte('income_date', end)
            .gte('income_date', start)
    
        if (error) console.log("error", error);
        else setIncome(income);
      };


    let sum = 0;
    var balance = 0;
    var earned = 0;
  
    for (let index = 0; index < expense.length; index++) {
    sum += expense[index].amount;
    }

    for (let index = 0; index < income.length; index++) {
    earned += income[index].amount;
      } 

    if (income.length === 1 || income.length > 1) {
        balance = earned - sum;
     }

    else {
      balance = -1 * sum;
    }
  
    return (
        <Box>
            { balance > 0  ? <h2> ${balance} left</h2>
             : <h2 style={{color: "red"}}> ${balance} left </h2>
             }
        </Box>
    )
  }
  
