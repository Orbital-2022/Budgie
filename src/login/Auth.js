import { useState } from 'react';
import { supabase } from '../config/supabaseClient';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import "../styles.css";

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Grid className="LoginGrid">
        <h1 className="header" id="loginHeader">Budgie</h1>
        <p className="description">Sign in via magic link with your email below</p>
        {loading ? (
          'Sending magic link...'
        ) : (
          <form className= "LoginEmail" onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <TextField 
              id="outlined-basic"
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" className="button block" aria-live="polite" variant="contained">Send magic link</Button>
          </form>
        )}
    </Grid>
  )
}