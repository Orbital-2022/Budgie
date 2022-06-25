
import { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';
import { useNavigate } from 'react-router-dom';
import Avatarz  from "../login/Avatar";
import { Grid } from '@mui/material';
import { Button, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import SimplePaper from '../components/SimplePaper/SimplePaper';
import styles from "./MainPage.module.css";
import { makeStyles } from '@mui/styles';
import "../styles.css";

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

const Account = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  const navigate = useNavigate();
  const user = supabase.auth.user();
  
  useEffect(() => {
    getProfile()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut();
      navigate("/");
  }

  const getProfile = async () => {
    try {
      setLoading(true)
      

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
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const updates = {
        id: user.id,
        username,
        avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }
    const logout = () => {
    supabase.auth.signOut();
    navigate("/");
   };
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

      <Grid item xs={10} container style={{textAlign: "center"}}>
       <SimplePaper>
       <h1 id="ProfileTitle">My Profile</h1>
       <Box className= "centre">
       <Avatarz
          url={avatar_url}
          size={150}
          onUpload={(url) => { setAvatarUrl(url)
          updateProfile({ username, avatar_url: url })
        }}
        />
        </Box>
        {loading ? (
          'Saving ...'
        ) : (
              
          <form onSubmit={updateProfile} className="LoginTextGrid">
            <div>
              <label className="loginlabel2" htmlFor="username">Name: </label>
              <TextField
                id="username"
                className="inputfield"
                type="text"
                value={username || ''}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div>
              <Button type="submit" className="submitbtnmedium" disabled={loading}>
                Update profile
              </Button>
            </div>
          </form>
        )}
        <Box id="profilebottom">
         <Button type="button" className="submitbtnmedium" onClick={() => logout}>
          Sign Out
        </Button>
        </Box>
        </SimplePaper>
        </Grid>
        </Grid>
    )
}
export default Account;
