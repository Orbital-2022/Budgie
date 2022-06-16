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
    Button
} from '@mui/material';

async function deleteExpenseRecords(id){

  const { data, error } = await supabase
  .from('expenses')
  .delete()
  .match({ id: id });

  if (error) console.log("error", error);

}

export default function RecordsTable(){
    const [data, setData] = useState([]);
    const user = supabase.auth.user();
  
    useEffect(() => {fetchData().catch(console.error);}, []);
    const fetchData = async () => {
      let { data: expense, error } = await supabase
          .from('expenses')
          .select("*")
          .eq('user_id',user.id)
  
      if (error) console.log("error", error);
      else setData(expense);
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
              <TableCell colSpan={2} >Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(data => (
              <TableRow
                key={data.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                 <TableCell></TableCell>
                <TableCell>{data.expense_date}</TableCell>
                <TableCell>{data.category}</TableCell>
                <TableCell>{data.amount}</TableCell>
                <TableCell align='center'>{data.remark}</TableCell>
                <Button variant="contained" style={{ borderRadius: 20, backgroundColor: "#21b6ae"}} >Edit</Button>
                <Button variant="contained" style={{ borderRadius: 20, backgroundColor: "#21b6ae"}} onClick={()=> deleteExpenseRecords(data.id)}>Delete</Button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }