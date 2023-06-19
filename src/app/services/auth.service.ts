import { Injectable } from '@angular/core';
import { AuthApiError, SignUpWithPasswordCredentials, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { Supabase } from 'src/models/supabase.client';

export interface SignUpParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private client: SupabaseClient = Supabase.getInstance();
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor() { }
  
  private setSession() {
    const session = localStorage.getItem('session') as User | null;
    if (session) this.userSubject.next(session as User);
  }
  
  get user() {
    return this.userSubject.asObservable();
  }
  
  async login(email: string, passowrd: string) : Promise<User | AuthApiError> {
    try {
      const { data, error } = await this.client.auth.signInWithPassword({
        email: email, password: passowrd
      });
      if (error) throw error;
      
      this.setSession();
      return data.user

    } catch (error) {
      return error as AuthApiError;
    }
  }

  async register({ email, password, firstName, lastName }: SignUpParams) {
    const params: SignUpWithPasswordCredentials = {
      email: email,
      password: password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName
        }
      }
    }

    try {
      const { data, error } = await this.client.auth.signUp(params);
      if (error) throw error;
      
      this.setSession();
      return data.user

    } catch (error) {
      console.log(error);
      return error;
    }
  }
  
  signOut() {
    return this.client.auth.signOut()
  }
}
