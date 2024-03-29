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

class EditIncome extends Component {
  constructor(props) {
      super(props);

      this.state = {
          date:  parseISO(moment().format("YYYY-MM-DD")),
          amount: "",
          category: "Salary",
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
      let { data: income, error } = await supabase
      .from('incomes')
      .update({
          income_date: $(".date").val(),
          amount:  to2dp(this.state.amount),
          category:  this.state.category,
          remark:  this.state.remarks,
      })
      .match({user_id: this.state.uid, id: this.state.rid})

      console.log(this)
      if (error) console.log("error", error);
          else 
          this.setState({data: income});
           
          $("#closePopup4").click();
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

    render(){
    return (
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
                  <span>Income</span>
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
                  <span>Category</span>
              </label>
              <div>
                  <select
                      name="category"
                      value={this.state.category}
                      onChange={this.handleChange.bind(this)}
                  >
                      <option value="Salary"> Salary</option>
                      <option value="Allowance">Allowance</option>
                      <option value="Scholarship">Scholarship</option>
                      <option value="Investment">Investment</option>
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
                      //required
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
  );
 
}
}


export default EditIncome;