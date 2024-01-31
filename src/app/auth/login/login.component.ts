import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isloading = false;
  constructor(public authService: AuthService) { }
  onLogin(form:NgForm){
    console.log(form.value)
    if(form.invalid) return;
    this.authService.createUser(form.value.email,form.value.password);
  }
}
