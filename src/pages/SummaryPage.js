import React from "react";
import { supabase } from "../config/supabaseClient";
import styles from "./MainPage.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material'
import { makeStyles } from '@mui/styles';
import DoughnutChart from "../components/Common/DoughnutChart.js";
import IncomeCard from "../components/Common/IncomeCard.js";
import ExpenseCard from "../components/Common/ExpenseCard";
import MonthlyComparison from "../components/Common/MonthlyComparison";

const useStyles = makeStyles((theme) => ({
  grid:{
    width: "100%",
    margin:"0px"
  },

  sidenav:{
    height: "100%",
    left:"0px",
  },

}));

function SummaryPage() {
    
    const [username, setUsername] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)
    const [alignment, setAlignment] = React.useState('expense');
    
    const handleChange = (event, newAlignment) => {
      setAlignment(newAlignment);
    };

    const navigate = useNavigate();
    
    async function handleLogout() {
        await supabase.auth.signOut();
          navigate("/");
      }
  
    useEffect(() => {
      getProfile()
    }, [])
  
    const getProfile = async () => {
      try {
        const user = supabase.auth.user()
  
        let { data, error, status } = await supabase
          .from('profiles')
          .select(`username, avatar_url`)
          .eq('id', user.id)
          .single()
  
        if (error && status !== 406) {
          throw error
        }
  
        if (data) {
          setUsername(data.username)
          setAvatarUrl(data.avatar_url)
        }
      } catch (error) {
        alert(error.message)
      } 
    }
    const url = "https://isqkkncijlswaxsakfwb.supabase.co/storage/v1/object/public/avatars/" + avatar_url;
    
    const classes = useStyles();

    return (
      <Grid container className={classes.grid}>

        <Grid item xs={2} className={classes.sidenav}>
          <div className={styles.layout} elevation={0}>
            <img src={url} alt="profile" className={styles.avatar}></img>
            <p> {username}</p>
            <Button 
            variant="contained" 
            style={{ borderRadius: 20, 
            backgroundColor: "#21b6ae", 
            padding: "12px 30px",
            fontSize: "12px"}}
            href="/mainpage"> 
            Home
            </Button>
            <Button 
            variant="contained" 
            style={{ borderRadius: 20, 
            backgroundColor: "#21b6ae", 
            padding: "12px 30px",
            fontSize: "12px"}}
            href="/profile"> 
            Profile
            </Button>
            <Button variant="contained" 
            style={{ borderRadius: 20, 
            backgroundColor: "#21b6ae", 
            padding: "12px 30px", 
            fontSize: "12px"}}
            href="/summary">
            Summary </Button>
            <Button variant="contained" 
        style={{ borderRadius: 20, 
        backgroundColor: "#21b6ae", 
        padding: "12px 30px",
        fontSize: "12px"}}
        href="/setting"> Settings </Button>
        <Button 
        variant="contained" 
        style={{ 
          borderRadius: 20, 
          backgroundColor: "#21b6ae", 
          padding: "12px 30px",
          fontSize: "12px"}}
          onClick={handleLogout}> Logout </Button>
          </div>
        </Grid>

        <Grid item xs={10} container spacing={2} style={{textAlign: "center"}} >

          <Grid item xs={6} ><IncomeCard /></Grid>
          <Grid item xs={6} ><ExpenseCard /></Grid>

          <Grid item xs={1} ></Grid>

          <Grid item xs={5} >
          <h1>
              Your Monthly Expense Chart
            </h1>
          <DoughnutChart />
          </Grid>

          <Grid item xs = {6} container >
           <Grid item xs={1} ></Grid>
            <Grid item xs={10}>
            <h1>
              Monthly Expense Comparison
            </h1>
            <MonthlyComparison />
            </Grid>
            <Grid item xs={1} ></Grid>
            <Grid item xs={12} ></Grid>
            <Grid item xs={12} ></Grid>
            <Grid item xs={12} ></Grid>
            <Grid item xs={12} ></Grid>

            <Grid item xs={5}></Grid>
            <Grid item xs={6}>
            <ToggleButtonGroup
              color="primary"
              size="large"
              value={alignment}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton value="Income" >View Income</ToggleButton>
              <ToggleButton value="Expense">View Expense</ToggleButton>
               </ToggleButtonGroup>
            </Grid>
            <Grid item xs={1}></Grid>

          

            
          </Grid>
          
         </Grid> 
      </Grid>    
    )
}

export default SummaryPage;