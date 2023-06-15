import { Injectable } from '@angular/core';
import { AuthChangeEvent, AuthSession, Session, SupabaseClient } from '@supabase/supabase-js';
import { Supabase } from 'src/models/supabase.client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private client: SupabaseClient = Supabase.getInstance();
  _session: AuthSession | null = null;

  constructor() { }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.client.auth.onAuthStateChange(callback)
  }

  signIn(email: string, passowrd: string) {
    return this.client.auth.signInWithPassword({
      email: email, password: passowrd
    });
  }

  signOut() {
    return this.client.auth.signOut()
  }
}
