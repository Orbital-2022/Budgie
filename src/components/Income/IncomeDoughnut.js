import { useEffect,useState } from "react";
import { Doughnut } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';
import { supabase } from "../../config/supabaseClient"; 
import { format, startOfMonth, endOfMonth } from 'date-fns';

function IncomeDoughnut(){
    const [data, setData] = useState([]);
    const user = supabase.auth.user();
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { fetchData().catch(console.error);}, []);

    const now = new Date();
    const start = format(startOfMonth(now), "yyyy-MM-dd");
    const end = format(endOfMonth(now), "yyyy-MM-dd");


    const fetchData = async () => {
      let { data: income, error } = await supabase
          .from('incomes')
          .select("*")
          .eq('user_id',user.id)
          .lte('income_date', end)
          .gte('income_date', start);
  
      if (error) 
      {console.log("error", error);
      console.log(start);
    }
      else {
        console.log(start);
        setData(income);
      }
    };
    
    var salary = 0;
    var allowance = 0;
    var scholarship = 0;
    var investment = 0;
    var others = 0;

     for (let index = 0; index < data.length; index++) {
        if (data[index].category === "Salary") {
            salary += data[index].amount;
        }
        else if (data[index].category === "Allowance") {
            allowance += data[index].amount;
        }

        else if (data[index].category === "Scholarship") {
            scholarship += data[index].amount;
        }
    
        else if (data[index].category === "Investment") {
            investment += data[index].amount;
        }
         
    
        else if (data[index].category === "Others") {
            others += data[index].amount;
        }

    
    }

  
const incomeData = {
    labels:['Salary', 'Allowance', 'Scholarship','Investment', 'Others'],
    datasets:[{
        data:[salary, allowance, scholarship, investment, others],
        backgroundColor: [
            "#FFC4C8",
            "#FF5685",
            "#FED154",
            "#FEB25E",
            "#6AC7E6",
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
        <Doughnut data={incomeData} />
    </div>
    )
}
export default IncomeDoughnut;