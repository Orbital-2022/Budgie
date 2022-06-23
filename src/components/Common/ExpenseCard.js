import { useState,useEffect } from "react";
import { supabase } from "../../config/supabaseClient";
import Box from "../Box/Box";


export default function ExpenseCard() {
    const [data, setData] = useState([]);
    const user = supabase.auth.user();
  
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
  
      if (error) console.log("error", error);
      else setData(expense);
    };


    let sum = 0;
  
    for (let index = 0; index < data.length; index++) {
    sum += data[index].amount;
    }
  
    return (
        <Box>
            <h2>Total expense:{sum}</h2>
        </Box>
    )
  }
  
