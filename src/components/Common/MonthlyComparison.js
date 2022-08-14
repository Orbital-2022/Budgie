import { useEffect,useState } from "react";
// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';
import { supabase } from "../../config/supabaseClient"; 
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { Line } from "react-chartjs-2";

function MonthlyComparison() {

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  
  //eslint-disable-next-line react-hooks/exhaustive-deps
 
  const FIVE_MONTHS_AGO = new Date();
  //FIVE_MONTHS_AGO.setMonth(FIVE_MONTHS_AGO.getMonth() - 5);
  var month1 = monthNames[FIVE_MONTHS_AGO.getMonth() - 5];
  
  const fiveStart = format(startOfMonth(FIVE_MONTHS_AGO.setMonth(FIVE_MONTHS_AGO.getMonth() - 5)), "yyyy-MM-dd");
  const fiveEnd = format(endOfMonth (FIVE_MONTHS_AGO.setMonth(FIVE_MONTHS_AGO.getMonth())), "yyyy-MM-dd");
  console.log(fiveStart);
  console.log(fiveEnd);


  const FOUR_MONTHS_AGO = new Date();
  //FOUR_MONTHS_AGO.setMonth(FOUR_MONTHS_AGO.getMonth() - 4);
  var month2 = monthNames[FOUR_MONTHS_AGO.getMonth() - 4];

  const fourStart = format(startOfMonth(FOUR_MONTHS_AGO.setMonth(FOUR_MONTHS_AGO.getMonth() - 4)), "yyyy-MM-dd");
  const fourEnd = format(endOfMonth (FOUR_MONTHS_AGO.setMonth(FOUR_MONTHS_AGO.getMonth())), "yyyy-MM-dd");
  console.log(fourStart);
  console.log(fourEnd);

  const THREE_MONTHS_AGO = new Date();
  //THREE_MONTHS_AGO.setMonth(THREE_MONTHS_AGO.getMonth() - 3);+

  var month3 = monthNames[THREE_MONTHS_AGO.getMonth() - 3];

  const threeStart = format(startOfMonth( THREE_MONTHS_AGO.setMonth(THREE_MONTHS_AGO.getMonth() - 3)), "yyyy-MM-dd");
  const threeEnd = format(endOfMonth (THREE_MONTHS_AGO.setMonth(THREE_MONTHS_AGO.getMonth())), "yyyy-MM-dd");
  console.log(threeStart);
  console.log(threeEnd);

  const TWO_MONTHS_AGO = new Date();
  var month4 = monthNames[TWO_MONTHS_AGO.getMonth() - 2];
  const twoStart = format(startOfMonth(TWO_MONTHS_AGO.setMonth(TWO_MONTHS_AGO.getMonth() - 2)), "yyyy-MM-dd");
  const twoEnd = format(endOfMonth(TWO_MONTHS_AGO.setMonth(TWO_MONTHS_AGO.getMonth())), "yyyy-MM-dd");
  console.log(twoStart);
  console.log(twoEnd);

  const ONE_MONTHS_AGO = new Date();
  var month5 = monthNames[ONE_MONTHS_AGO.getMonth() - 1];
  
  const oneStart = format(startOfMonth(ONE_MONTHS_AGO.setMonth(ONE_MONTHS_AGO.getMonth() - 1)), "yyyy-MM-dd");
  const oneEnd = format(endOfMonth(ONE_MONTHS_AGO.setMonth(ONE_MONTHS_AGO.getMonth())), "yyyy-MM-dd");

  console.log(oneStart);
  console.log(oneEnd);

  const now = new Date();
  //console.log(now)
  var month6 = monthNames[now.getMonth()];
  const nowStart = format(startOfMonth(now), "yyyy-MM-dd");
  const nowEnd = format(endOfMonth(now), "yyyy-MM-dd");

 
  var sum6 = FetchData(nowEnd, nowStart);
  var sum5 = FetchData(oneEnd, oneStart);
  var sum4 = FetchData(twoEnd, twoStart);
  var sum3 = FetchData(threeEnd, threeStart);
  var sum2 = FetchData(fourEnd, fourStart);
  var sum1 = FetchData(fiveEnd, fiveStart);

  console.log(sum1);
  console.log(sum2);
  console.log(sum3);
  console.log(sum4);
  console.log(sum5);
  console.log(sum6);

  
  const data = {
    labels: [month1,month2, month3, month4, month5, month6],
    datasets: [
      {
        label: "Monthly expenses",
        data: [sum1, sum2, sum3, sum4, sum5, sum6],
        fill: false,
        borderColor: "#742774"
      }
    ],

  };
  const options = {
    responsive: true,
    aspectRatio: 1,

    scales: {
      x: {
        grid: {
          color: 'rgba(255,255,255)',
          borderColor: 'white',
          lineWidth: 3,
        }
      },
      y: {
        grid: {
          color: 'rgba(255,255,255)',
          borderColor: 'white',
          lineWidth: 3
        }
      }
    }
  };
      return (
        <div>
          <Line options={options} data={data} />
      </div>
      )
}


  


function FetchData(end,start) {
  const [data, setData] = useState([]);
  const user = supabase.auth.user();
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetch().catch(console.error);}, []);
  const fetch = async () => {
      let { data: expense, error } = await supabase
          .from('expenses')
          .select("*")
          .eq('user_id',user.id)
          .lt('expense_date', end)
          .gt('expense_date', start);
  
      if (error) 
      {console.log("error", error);
      console.log(start);
    }
      else {
        console.log(start);
        setData(expense);
      }
    };

    let sum = 0;
    if ( data.length !== 0 ) {
      for (let index = 0; index < data.length; index++) {
        sum += data[index].amount;
      }
    }
    return sum;
}



export default MonthlyComparison;