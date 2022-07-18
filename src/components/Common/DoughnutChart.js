import { useEffect,useState } from "react";
import { Doughnut } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';
import { supabase } from "../../config/supabaseClient"; 
import { format, startOfMonth, endOfMonth } from 'date-fns';

function DoughnutChart(){
    const [data, setData] = useState([]);
    const user = supabase.auth.user();
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { fetchData().catch(console.error);}, []);

    const now = new Date();
    const start = format(startOfMonth(now), "yyyy-MM-dd");
    const end = format(endOfMonth(now), "yyyy-MM-dd");


    const fetchData = async () => {
      let { data: expense, error } = await supabase
          .from('expenses')
          .select("*")
          .eq('user_id',user.id)
          .lte('expense_date', end)
          .gte('expense_date', start);
  
      if (error) 
      {console.log("error", error);
      console.log(start);
    }
      else {
        console.log(start);
        setData(expense);
      }
    };
    
    var food = 0;
    var entertainment = 0;
    var clothing = 0;
    var healthcare = 0;
    var travel = 0;
    var shopping = 0;
    var personalcare = 0;
    var investment = 0;
    var gift = 0;
    var utilities = 0;
    var others = 0;


     for (let index = 0; index < data.length; index++) {
        if (data[index].category === "Food") {
            food += data[index].amount;
        }
        else if (data[index].category === "Entertainment") {
            entertainment += data[index].amount;
        }

        else if (data[index].category === "Clothing") {
            clothing += data[index].amount;
        }
    
        else if (data[index].category === "Healthcare") {
            healthcare += data[index].amount;
        }
         
        else if (data[index].category === "Travel") {
            travel += data[index].amount;
        }
        
        else if (data[index].category === "Shopping") {
            shopping += data[index].amount;
        }

        else if (data[index].category === "Personal Care") {
            others += data[index].amount;
        }

        
        else  if (data[index].category === "Investment") {
            investment += data[index].amount;
        }

        else if (data[index].category === "Gifts & Donations") {
            gift += data[index].amount;
        }

        else if (data[index].category === "Utilities") {
            utilities += data[index].amount;
        }

    
        else if (data[index].category === "Others") {
            others += data[index].amount;
        }

    
    }

  
const expenseData = {
    labels:['Food', 'Entertainment', 'Clothing', 'Healthcare', 'Travel', 'Shopping', 'Personal Care', 'Investment', 'Gifts & Donations', 'Utilities', 'Others'],
    datasets:[{
        data:[food, entertainment, clothing, healthcare, travel, shopping, personalcare, investment, gift, utilities, others],
        backgroundColor: [
            "#FFC4C8",
            "#FF5685",
            "#FED154",
            "#FEB25E",
            "#6AC7E6",
            "#D6A3DC",
            "#6ACCBC",
            "#85ff56",
            "#003f5c",
            "#4974a5",
            "#F5F5DC"

        ]
    }],
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Custom Chart Title'
            }
        }
    }
}
 
    return (
      <div styles={{width:400}}>
        <Doughnut data={expenseData} />
    </div>
    )
}
export default DoughnutChart;