import React, { Component } from "react";
import { supabase } from '../../config/supabaseClient';
import DatePicker from "react-datepicker";
import $ from "jquery";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from 'date-fns'
import "../../styles.css";
import "../styles/form.css";
import to2dp from "../utils/round";
//const user = supabase.auth.user();
class EditRecordsTable extends Component {
  constructor(props) {
      super(props);

      this.state = {
          date:  parseISO(moment().format("YYYY-MM-DD")),
          amount: "",
          category: "Food",
          remarks: "",
          uid: this.props.user.id,
          rid: this.props.rid,
      };
      console.log(this)

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
  }
  
  handleSubmit = async(event) => {
    event.preventDefault();
      let { data: expense, error } = await supabase
      .from('expenses')
      .update({
          expense_date: $(".date").val(),
          amount:  to2dp(this.state.amount),
          category:  this.state.category,
          remark:  this.state.remarks,
      })
      .match({user_id: this.state.uid, id: this.state.rid})

      console.log(this)
      if (error) console.log("error", error);
          else 
          this.setState({data: expense});
          
          $("#closePopup3").click();

      }
    
    handleChange(e) {
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handleDateChange(date) {
        this.setState({
            date: date
        });
    }

    render() {
    return (
        <div>
      <form onSubmit={this.handleSubmit}>
          <div>
              <label>
                  <span>Date</span>
              </label>
              <div>
                  <DatePicker
                      dateFormat="yyyy-MM-dd"
                      name="date"
                      selected={this.state.date}
                      onChange={this.handleDateChange.bind(this)}
                  />
              </div>
          </div>
          <div>
              <label>
                  <span>Expense</span>
              </label>
              <div>
                  <input
                      autoFocus
                      required
                      type="number"
                      name="amount"
                      placeholder="Should be within 2 d.p."
                      onChange={this.handleChange.bind(this)}
                      value={this.state.amount}
                  />
              </div>
          </div>
          <div>
              <label>
                  <span>category</span>
              </label>
              <div>
                  <select
                      name="category"
                      placeholder="Should not be empty"
                      value={this.state.category}
                      onChange={this.handleChange.bind(this)}
                  >
                      <option value="Food"> Food </option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Travel">Travel</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Personal Care">Personal Care</option>
                      <option value="Investment">Investment</option>
                      <option value="Gifts & Donations">Gifts & Donations</option>
                      <option value="Utilities"> Utilities</option>
                      <option value="Others">Others</option>
                  </select>
              </div>
          </div>
          <div>
              <label>
                  <span>Remarks</span>
              </label>
              <div>
                  <textarea
                      type="text"
                      name="remarks"
                      placeholder="Optional"
                      onChange={this.handleChange.bind(this)}
                      value={this.state.remarks}
                  />
              </div>
          </div>
         
          {this.state.amount > 0 && this.state.date && this.state.category ? (
              <button type="submit">
                  save
              </button>
          ) : (
                  <div>
                      <button disabled type="submit">
                          save
                  </button>
                  </div>
              )}
      </form>
</div>
  );
 
}
}


export default EditRecordsTable;