
import { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';
import { useNavigate } from 'react-router-dom';
import Avatar  from "../login/Avatar";
import { Grid } from '@mui/material';
//import Logo from '../Logo.png';

const Account = ({  }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  const navigate = useNavigate();
  const user = supabase.auth.user();
  
  useEffect(() => {
    getProfile()
  }, [])

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
    <div aria-live="polite">
      {loading ? (
        'Saving ...'
      ) : (
        <Grid 
        alignItems="center"
        justifyContent="center"
        >
          <h1 className="header" id="Header">Profile</h1>
          <Avatar
            url={avatar_url}
            size={150}
           onUpload={(url) => { setAvatarUrl(url)
            updateProfile({ username, avatar_url: url })
          }}
          />
        <form onSubmit={updateProfile} className="form-widget">
        
          <div>
            <label htmlFor="username">Name</label>
            <input
              id="username"
              type="text"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div>
            <button className="button block primary" disabled={loading}>
              Update profile
            </button>
          </div>
        </form>
        </Grid>
      )}
       <button type="button" className="button block" onClick={logout }>
        Sign Out
      </button>
      <button onClick={()=>navigate("/mainpage")}>Main Page</button>
    </div>
 
  )
}

export default Account;
// img  className= 'centrepic' src = Logo alt='Budgie Logo'
//div>Email: {session.user.email}</div>