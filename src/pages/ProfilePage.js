
import { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';
import { useNavigate } from 'react-router-dom';
import Avatar  from "../login/Avatar";
//import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import SimplePaper from '../components/SimplePaper/SimplePaper';
//import Logo from '../Logo.png';

const Account=({ session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  const navigate = useNavigate();
  const user = supabase.auth.user();
  
  useEffect(() => {getProfile()}, [{session}])

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

    return (
      /*<div aria-live="polite">*/
      <div>
          <Avatar
           url={avatar_url}
           size={150}
          onUpload={(url) => {
        setAvatarUrl(url)
        updateProfile({username, avatar_url: url })
      }}
    />
    
       <SimplePaper>
       <h1 id="ProfileTitle">My Profile</h1>
        {loading ? (
          'Saving ...'
        ) : (
              
          <form onSubmit={updateProfile} className="LoginTextGrid">
            <div>
              <label className="loginlabel2"htmlFor="username">Name: </label>
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
        <box id="profilebottom">
         <Button type="button" className="submitbtnmedium" onClick={() => logout}>
          Sign Out
        </Button>
        <Button onClick={()=>navigate("/mainpage")} className="submitbtnmedium">Main Page</Button>
        </box>
        </SimplePaper>
      </div>
    )
}
export default Account;
