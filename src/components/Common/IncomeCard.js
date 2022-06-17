import { useState,useEffect } from "react";
import { supabase } from "../../config/supabaseClient";
import Box from "../Box/Box";


export default function IncomeCard() {
    const [data, setData] = useState([]);
    const user = supabase.auth.user();
  
    useEffect(() => {fetchData().catch(console.error);}, []);
    
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
            <h2>Total income:{sum}</h2>
        </Box>
    )
  }

  