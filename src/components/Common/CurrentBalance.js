import { useState,useEffect } from "react";
import { supabase } from "../../config/supabaseClient";
import Box from "../Box/Box";


export default function CurrentBalance() {
    const [data, setData] = useState([]);
    const [budget, setBudget] = useState([]);
    const user = supabase.auth.user();
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { fetchData().catch(console.error);}, [data]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { fetchBudget().catch(console.error);}, [budget]);
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
            .from('budget')
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
  
      if (error) console.log("error", error);
      else setData(expense);
    };

    const fetchBudget = async () => {
        let { data: budget, error } = await supabase
            .from('budget')
            .select("amount")
            .eq('id',user.id)
    
        if (error) console.log("error", error);
        else setBudget(budget);
      };


    let sum = 0;
    var balance = 0;
  
    for (let index = 0; index < data.length; index++) {
    sum += data[index].amount;
    }

    if (budget.length === 1) {
       balance = budget[0].amount - sum;
    }
    else {
      balance = -1 * sum;
    }
  
    return (
        <Box>
            <h2> Remaining Budget:{balance}</h2>
        </Box>
    )
  }
  
