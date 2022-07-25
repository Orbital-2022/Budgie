import React, { Component } from "react";
import { supabase } from '../../config/supabaseClient';
import $ from "jquery";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from 'date-fns';
import to2dp from "../utils/round";
 
const user = supabase.auth.user();
class SetBudget extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            amount: this.props.amount,
            date: parseISO(moment().format("YYYY-MM-DD")),
            id: this.props.user.id,
            dataSaved: false
        };
        console.log(this)
  
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleSubmit = async(event) => {
      event.preventDefault();
        let { data: budget, error } = await supabase
        .from('budget')
        .insert({
            id: this.state.id,
            joinedat: $(".date").val(),
            amount:  to2dp(this.state.amount),
        });
        console.log(this)
        if (error) 
        {
            let { data: budget, error } = await supabase
         .from('budget')
         .update({ 
            joinedat: $(".date").val(),
            amount:  to2dp(this.state.amount),
         })
         .eq('this.state.id', user.id)
         this.setState({data: budget});
         if (error)
         console.log(error)
        }
            else 
            this.setState({data: budget});

            this.setState({
                amount: this.props.amount,
                date: parseISO(moment().format("YYYY-MM-DD")),
                id: this.props.user.id,
                dataSaved: true
            });
        }
      
      handleChange(e) {
          // If you are using babel, you can use ES 6 dictionary syntax { [e.target.name] = e.target.value }
          var change = {};
          change[e.target.name] = e.target.value;
          this.setState(change);
      }
  
      render(){
      return (
        <form onSubmit={this.handleSubmit}>

            <div className="form-group row">
                <label className="TBC">
                    <span>Your Budget</span>
                </label>
                <div className="TBC">
                    <input
                        className="form-control"
                        autoFocus
                        required
                        type="number"
                        name="amount"
                        onChange={this.handleChange.bind(this)}
                        value={this.state.amount ||""}
                    />
                </div>
                    </div>
            {this.state.dataSaved ? (
                <span className="bg-success"> Data saved successfully!!!</span>
            ) : (
                    <span />
                )}
            {this.state.amount > 0 && this.state.date ? (
                <button className="btn btn-primary float-right" type="submit">
                    save
                </button>
            ) : (
                    <div>
                        <div >
                            <div> Budget : should be greater than 0 </div>
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
  
  export default SetBudget;