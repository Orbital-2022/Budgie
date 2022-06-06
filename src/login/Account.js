import { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SimplePaper from '../components/SimplePaper/SimplePaper';
import "../styles.css";

const Account = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  //const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  const navigate = useNavigate();
  
  useEffect(() => {
    getProfile()
  }, [session])

  const getProfile = async () => {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, avatar_url`)
        //website deleted
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        //setWebsite(data.website)
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
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        username,
        //website,
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

  return (
    /*<div aria-live="polite">*/
    <div>
     <SimplePaper>
     <h1 id="ProfileTitle">My Profile</h1>
      {loading ? (
        'Saving ...'
      ) : (
        <form onSubmit={updateProfile} className="LoginTextGrid">
          <div className="loginlabel2">Email: {session.user.email}</div>
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
       <Button type="button" className="submitbtnmedium" onClick={() => supabase.auth.signOut()}>
        Sign Out
      </Button>
      <Button onClick={()=>navigate("/mainpage")} className="submitbtnmedium">Main Page</Button>
      </box>
      </SimplePaper>
    </div>
  )
}

export default Account;