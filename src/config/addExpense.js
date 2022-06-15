/*import { supabase } from "./supabaseClient";
import { useState, useEffect } from 'react';
const [expense, setExpense] = useState([]);

  const addExpenseTable = async(uid, date, amount, category, remarks) => {
    let { data: expense, error } = await supabase
    .from('expenses')
    .insert({
        user_id: 'uid',
        date:'date',
        amount :'amount',
        category: 'category',
        remark: 'remarks',
    });
    if (error) console.log("error", error);
        else setExpense(expense);
};

render(){
    return (
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="Category">Category</label>
          <input className="form-control" id="Category" />
        </div>
        <div className="form-group">
          <label htmlFor="Amount">Amount</label>
          <input
            type="number"
            className="form-control"
            id="Amount"
            placeholder="10"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Remarks">Remarks</label>
          <input
            type="text"
            className="form-control"
            id="text"
            placeholder="E.g Impulsive purchase"
          />
        </div>
        <div className="col-sm-10 col-xs-6">
                              <DatePicker
                                  className={"form-control"}
                                  name="date"
                                  selected={date}
                                  onChange={date => setDate(date)}
                              />
                          </div>
        <div className="form-group">
          <button className="form-control btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    );   
  };
  export default EditExpenseForm;