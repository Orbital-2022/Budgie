import { useEffect,useState } from "react";
import { supabase } from "../../config/supabaseClient";
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIncomeRow from "../PopUp/EditIncomePopup"


async function deleteIncomeRecords(id){

  // eslint-disable-next-line no-unused-vars
  const { data, error } = await supabase
  .from('incomes')
  .delete()
  .match({ id: id });

  if (error) console.log("error", error);

}

export default function IncomeTable(){
    const [data, setData] = useState([]);
    const user = supabase.auth.user();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {fetchData().catch(console.error);}, [data]);
    useEffect(() => {

      fetchData().catch(console.error);
      const subscription = supabase
          .from('incomes')
          .on('*', incomes => {
          console.log('Change received!', incomes)
          })
          .subscribe()
  
      return () => {
        supabase.removeSubscription(subscription)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
      let { data: income, error } = await supabase
          .from('incomes')
          .select("*")
          .eq('user_id',user.id)
          .order('income_date', { ascending: false })
  
      if (error) console.log("error", error);
      else setData(income);
    };
  
    return (
      <TableContainer sx={{ maxHeight: '500px' }} component={Paper}>
        <Table stickyHeader aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align='center'>Date</TableCell>
              <TableCell align='left'>Category</TableCell>
              <TableCell align='left'>Amount</TableCell>
              <TableCell align='left'>Remarks</TableCell>
              <TableCell align="center" >Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(data => (
              <TableRow
                key={data.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                 <TableCell></TableCell>
                <TableCell align='center'>{data.income_date}</TableCell>
                <TableCell>{data.category}</TableCell>
                <TableCell>{data.amount}</TableCell>
                <TableCell>{data.remark}</TableCell>
                <TableCell> 
                
                <EditIncomeRow 
                   user = {supabase.auth.user()}
                   rid = {data.id}
                />
                  <IconButton>
                    
                    <DeleteIcon onClick={()=> deleteIncomeRecords(data.id)} />
                  </IconButton>
                 
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }