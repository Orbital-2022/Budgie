import { Button } from "@mui/material";
import React from "react";
import { supabase } from "../config/supabaseClient";
import styles from "./MainPage.module.css";
import { useNavigate } from "react-router-dom";
import {useEffect, useState } from "react";
import Box from "../components/Box";

function IncomeCard() {

  return (
      <Box>
          <h2>Total income:</h2>
      </Box>
  )
}

function ExpenseCard() {
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
  
  let sum = 0;

  for (let index = 0; index < data.length; index++) {
  sum += data[index].amount;
  }

  return (
      <Box>
          <h2>Total expense:{sum}</h2>
      </Box>
  )
}

  
export function CardsAndTable() {

  return (
    <div className={styles.container}>
    <h1>Your Balance: </h1>
    <IncomeCard />
    <ExpenseCard />     
     </div>

  );
}

function MainPage({session}) {
    
    const [username, setUsername] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)

    const navigate = useNavigate();
    async function handleLogout() {
        await supabase.auth.signOut();
          navigate("/");
      }
  
    useEffect(() => {
      getProfile()
    }, [session])
  
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
  
    return (
      <div>
        <div className={styles.sidenav}>
            <img src={url} alt="profile" className={styles.avatar}></img>
            <p> {username}</p>
        <Button 
            variant="contained" 
            style={{ borderRadius: 20, 
            backgroundColor: "#21b6ae", 
            padding: "12px 30px",
            fontSize: "12px"}}
            href="/mainpage"> 
            Home Page
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
        <Button variant="contained" style={{ borderRadius: 20, backgroundColor: "#21b6ae", padding: "12px 30px",fontSize: "12px"}}> Summary </Button>
        <Button variant="contained" style={{ borderRadius: 20, backgroundColor: "#21b6ae", padding: "12px 30px",fontSize: "12px"}}> Setting </Button>
        <Button 
        variant="contained" 
        style={{ 
          borderRadius: 20, 
          backgroundColor: "#21b6ae", 
          padding: "12px 30px",
          fontSize: "12px"}}
          onClick={handleLogout}> Logout </Button>
        </div>
        <CardsAndTable />
        </div>
    )
}
export default MainPage;

/**
 *  <div>
            <ul>{data.map(data => <li key={data}> {data.amount} </li>)}</ul>
          </div>
 */