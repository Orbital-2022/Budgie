import React, { Component } from "react";
import { supabase } from '../../config/supabaseClient';
import DatePicker from "react-datepicker";
import $ from "jquery";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from 'date-fns'
import "../../styles.css";

class EditIncomeForm extends Component {
  constructor(props) {
      super(props);

      this.state = {
          //date:"",
          date:  parseISO(moment().format("YYYY-MM-DD")),
          amount: "",
          category: "Salary",
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
      let { data: income, error } = await supabase
      .from('incomes')
      .insert({
          user_id: this.state.uid,
          //income_date:  parseISO(this.state.date),
          income_date: $(".date").val(),
          amount:  this.state.amount,
          category:  this.state.category,
          remark:  this.state.remarks,
      });
      console.log(this)
      if (error) console.log("error", error);
          else 
          //this.setExpense(expense);
          this.setState({data: income});
           // reset form once saved

        this.setState({
            date:  parseISO(moment().format("YYYY-MM-DD")),
            amount: "",
            category: "Salary",
            remarks: "",
            uid: this.props.user.id,
            dataSaved: true
        });
      }
    
    handleChange(e) {
        // If you are using babel, you can use ES 6 dictionary syntax { [e.target.name] = e.target.value }
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
                      //value={this.state.date}
                  />
              </div>
          </div>
          <div className="form-group row">
              <label className="TBC">
                  <span>Income</span>
              </label>
              <div className="TBC">
                  <input
                      className="form-control"
                      autoFocus
                      required
                      type="number"
                      name="amount"
                      onChange={this.handleChange.bind(this)}
                      value={this.state.amount}
                  />
              </div>
          </div>
          <div className="form-group row">
              <label className="col-sm-2 col-xs-6 col-form-label">
                  <span>Category</span>
              </label>
              <div className="col-sm-10 col-xs-6">
                  <select
                      className="form-control"
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
          <div className="form-group row">
              <label className="TBC">
                  <span>Remarks</span>
              </label>
              <div className="TBC">
                  <textarea
                      className="form-control"
                      type="text"
                      required
                      name="remarks"
                      onChange={this.handleChange.bind(this)}
                      value={this.state.remarks}
                  />
              </div>
          </div>
          {this.state.dataSaved ? (
              <span className="bg-success"> Data saved successfully!</span>
          ) : (
                  <span />
              )}
          {this.state.amount > 0 && this.state.date && this.state.category ? (
              <button className="btn btn-primary float-right" type="submit">
                  save
              </button>
          ) : (
                  <div>
                      <div >
                          <div> Income : should be greater than 0 </div>
                          <div> Date : should be selected </div>
                      </div>
                      <button className="btn btn-primary float-right" disabled type="submit">
                          save
                  </button>
                  </div>
              )}
      </form>
  );
 
}
}


export default EditIncomeForm;