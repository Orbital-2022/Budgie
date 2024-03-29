import { useState,useEffect } from "react";
import { supabase } from "../../config/supabaseClient";
import Box from "../Box/Box";
import to2dp from "../utils/round";

export default function IncomeCard() {
    const [data, setData] = useState([]);
    const user = supabase.auth.user();
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {fetchData().catch(console.error);}, [data]);
    
    const fetchData = async () => {
      let { data: income, error } = await supabase
          .from('incomes')
          .select("*")
          .eq('user_id',user.id)
  
      if (error) console.log("error", error);
      else setData(income);
    };
    
    let sum = 0;
  
    for (let index = 0; index < data.length; index++) {
    sum += data[index].amount;
    }
    return (
        <Box>
            <h2>Total income: ${to2dp(sum)}</h2>
        </Box>
    )
  }

  