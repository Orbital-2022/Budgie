import { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';
import Auth from '../login/Auth';
import Account from '../login/Account';
import Grid from '@mui/material/Grid';
import "../styles.css";



export default function LoginPage() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <Grid id = "BudgieLogo">
      {!session ? <Auth /> : <Account key={session.user.id} session={session}/>}
    </Grid>
  )
}