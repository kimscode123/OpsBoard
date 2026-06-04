// src/hooks/useAuth.js
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

/*useEffect(() => {
  supabase.auth.getSession().then(({ data }) => {
    console.log('getSession result', data);
    setSession(data.session ?? null);
    setUser(data.session?.user ?? null);
  });

  const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    console.log('onAuthStateChange', _event, session);
    setSession(session ?? null);
    setUser(session?.user ?? null);
  });

  return () => listener?.subscription.unsubscribe();
}, []);*/


export default function userAuth() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    // get current session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
    });

    // listen for changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ?? null);
      setUser(session?.user ?? null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return { session, user };
}
