import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  isloading = false;
  constructor(public authService: AuthService) { }
  onSignUp(form:NgForm){
    console.log(form.value)
    if(form.invalid) return;
    this.authService.createUser(form.value.email,form.value.password);
  }
}
