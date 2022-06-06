import styles from "./SideNav.module.css";
import { Button } from "@mui/material";
import { supabase } from "../../config/supabaseClient"
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";

export default function SideNav () {
  const [username, setUsername] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const navigate = useNavigate();
  const user = supabase.auth.user();

  
  if (!user) {
    navigate("/")
  }
  async function handleLogout() {
    await supabase.auth.signOut();
      navigate("/");
  }

  useEffect(() => {
    getProfile()
  })

  const getProfile = async () => {
    try {  
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
    );
  }
