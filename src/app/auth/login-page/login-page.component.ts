import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthApiError } from '@supabase/supabase-js';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ReactiveFormComponent } from 'src/models/reactive_form';

@Component({
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent extends ReactiveFormComponent implements OnInit {

  constructor (private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private toasterService: ToastrService) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  override initForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    this.form.markAllAsTouched();

    if (this.invalidForm) {
      console.log('invalid form', this.form.value);
      return;
    }

    const { email, password } = this.form.value;
    const response = await this.authService.login(email, password);

    if (response instanceof AuthApiError) {
      if (response.message === 'Invalid login credentials') this.setFormErrors('email', { invalidCred: true })
      else this.setFormErrors('email', { unknown: true });
      return;
    }

    this.toasterService.success('ingreso exitoso', '', {tapToDismiss: false});   
    this.router.navigateByUrl('/dashboard');
  }

}
