import { Injectable } from '@angular/core';
import { AuthApiError, Session, SignUpWithPasswordCredentials, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { UserRole } from 'src/models/domain_user';
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

  constructor() { }
  
  private setSession(session: Session) {
    localStorage.setItem('session', session.access_token);
  }

  
  async login(email: string, passowrd: string) : Promise<User | AuthApiError> {
    try {
      const { data, error } = await this.client.auth.signInWithPassword({
        email: email, password: passowrd
      });
      if (error) throw error;
      
      this.setSession(data.session);
      return data.user;

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
        
      await this.client.from('profiles')
        .update({ first_name: firstName, last_name: lastName, role: UserRole.Normal, full_name: `${firstName} ${lastName}` })
        .eq('id', data.user?.id)

      return data.user

    } catch (error) {
      console.log(error);
      return error;
    }
  }
  
  signOut() {
    localStorage.removeItem('session');
    return this.client.auth.signOut()
  }
}
