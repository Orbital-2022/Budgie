import React, { Component } from "react";
import { supabase } from '../../config/supabaseClient';
import DatePicker from "react-datepicker";
import $ from "jquery";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from 'date-fns'
import "../../styles.css";
import "../styles/form.css";

class EditExpenseForm extends Component {
  constructor(props) {
      super(props);

      this.state = {
          date:  parseISO(moment().format("YYYY-MM-DD")),
          amount: "",
          category: "Food",
          remarks: "",
          uid: this.props.user.id,
          dataSaved: false
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
      .insert({
          user_id: this.state.uid,
          expense_date: $(".date").val(),
          amount:  this.state.amount,
          category:  this.state.category,
          remark:  this.state.remarks,
      });

      console.log(this)
      if (error) console.log("error", error);
          else 
          this.setState({data: expense});
          
          $("#closePopup").click();

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
        <div>
      <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
              <label className="TBC">
                  <span>Date</span>
              </label>
              <div className="TBC">
                  <DatePicker
                      className={
                          "form-control date " 
                      }
                      dateFormat="yyyy-MM-dd"
                      name="date"
                      selected={this.state.date}
                      onChange={this.handleDateChange.bind(this)}
                  />
              </div>
          </div>
          <div className="form-group row">
              <label className="TBC">
                  <span>Expense</span>
              </label>
              <div className="TBC">
                  <input
                      className="form-control"
                      autoFocus
                      required
                      type="number"
                      name="amount"
                      placeholder="Should be greater than 0"
                      onChange={this.handleChange.bind(this)}
                      value={this.state.amount}
                  />
              </div>
          </div>
          <div className="form-group row">
              <label className="col-sm-2 col-xs-6 col-form-label">
                  <span>category</span>
              </label>
              <div className="col-sm-10 col-xs-6">
                  <select
                      className="form-control"
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
          <div className="form-group row">
              <label className="TBC">
                  <span>Remarks</span>
              </label>
              <div className="TBC">
                  <textarea
                      className="form-control"
                      type="text"
                      name="remarks"
                      placeholder="Optional"
                      onChange={this.handleChange.bind(this)}
                      value={this.state.remarks}
                  />
              </div>
          </div>
         
          {this.state.amount > 0 && this.state.date && this.state.category ? (
              <button className="btn btn-primary float-right" type="submit">
                  save
              </button>
          ) : (
                  <div>
                      <button className="btn btn-primary float-right" disabled type="submit">
                          save
                  </button>
                  </div>
              )}
      </form>
</div>
  );
 
}
}


export default EditExpenseForm;