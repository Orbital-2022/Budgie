import { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';
import Auth from '../login/Auth';
import Account from '../login/Account';
import Logo from '../Logo.png'

export default function LoginPage() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div >
        <img src = {Logo} width={597} height={422} alt='Budgie Logo'/>
      {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
    </div>
  )
}