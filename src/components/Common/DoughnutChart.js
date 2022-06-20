import { useEffect,useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { supabase } from "../../config/supabaseClient"; 

function DoughnutChart(){
    const [data, setData] = useState([]);
    const user = supabase.auth.user();
  
    useEffect(() => { fetchData().catch(console.error);}, []);
    
    const fetchData = async () => {
      let { data: expense, error } = await supabase
          .from('expenses')
          .select("*")
          .eq('user_id',user.id)
  
      if (error) console.log("error", error);
      else setData(expense);
    };
    
    var food = 0;
    var entertainment = 0;
    var shopping = 0;
    var commuting = 0;
    var bills = 0;
    var others = 0;
    var healthcare = 0;

     for (let index = 0; index < data.length; index++) {
        if (data[index].category === "Food") {
            food += data[index].amount;
        }
        else if (data[index].category === "Entertainment") {
            entertainment += data[index].amount;
        }
       
        else if (data[index].category === "Shopping") {
            shopping += data[index].amount;
        }
         
        else if (data[index].category === "Commuting") {
            commuting += data[index].amount;
        }
         
        else if (data[index].category === "Bills") {
            bills += data[index].amount;
        }
        
        else if (data[index].category === "Others") {
            others += data[index].amount;
        }

        else  if (data[index].category === "Healthcare") {
            healthcare += data[index].amount;
        }
    
    }

  
const expenseData = {
    labels:['Food', 'Entertainment', 'Shopping', 'Commuting','Bills','Others','Healthcare'],
    datasets:[{
        data:[food, entertainment, shopping, commuting, bills, others, healthcare],
        backgroundColor: [
            "#FFC4C8",
            "#FF5685",
            "#FED154",
            "#FEB25E",
            "#6AC7E6",
            "#D6A3DC",
            "#6ACCBC"
        ]

    }]
}
 
    return (
      <div styles={{width:400}}>
        <Doughnut data={expenseData} />
    </div>
    )
}
export default DoughnutChart;