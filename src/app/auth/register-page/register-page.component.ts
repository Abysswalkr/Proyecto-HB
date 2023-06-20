import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthApiError } from '@supabase/supabase-js';
import { ToastrService } from 'ngx-toastr';
import { AuthService, SignUpParams } from 'src/app/services/auth.service';
import { ReactiveFormComponent } from 'src/models/reactive_form';

@Component({
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent extends ReactiveFormComponent implements OnInit {

  constructor (
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toasterService: ToastrService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  override initForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async register() {
    this.form.markAllAsTouched();
    
    if (this.invalidForm) {
      console.log('invalid form', this.form.value);
      return;
    }
    
    const signUpData: SignUpParams = this.form.value;
    const response = await this.authService.register(signUpData);
    
    if (response instanceof AuthApiError) {
      if (response.message === 'User already registered') this.setFormErrors('email', { emailAlreadyExists: true })
      else this.setFormErrors('email', { unknown: true });
      return;
    }
    
    this.toasterService.success('usuario registrado', '', {tapToDismiss: false});   
    this.router.navigateByUrl('/login'); 
  }

}
