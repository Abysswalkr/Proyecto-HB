import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { HomeComponent } from './dashboard/home/home.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginPageComponent,
    HomeComponent,
    RegisterPageComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
