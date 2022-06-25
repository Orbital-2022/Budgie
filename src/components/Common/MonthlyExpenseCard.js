import { useState,useEffect } from "react";
import { supabase } from "../../config/supabaseClient";
import Box from "../Box/Box";
import { format, startOfMonth, endOfMonth } from 'date-fns';

export default function MonthlyExpenseCard() {
    const [data, setData] = useState([]);
    const user = supabase.auth.user();
  
    const now = new Date();
    const start = format(startOfMonth(now), "yyyy-MM-dd");
    const end = format(endOfMonth(now), "yyyy-MM-dd");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { fetchData().catch(console.error);}, [data]);
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


    const fetchData = async () => {
      let { data: expense, error } = await supabase
          .from('expenses')
          .select("*")
          .eq('user_id',user.id)
          .lt('expense_date', end)
          .gt('expense_date', start)
  
      if (error) console.log("error", error);
      else setData(expense);
    };


    let sum = 0;
  
    for (let index = 0; index < data.length; index++) {
    sum += data[index].amount;
    }
  
    return (
        <Box>
            <h2>You spent ${sum} this month!</h2>
        </Box>
    )
  }
  
