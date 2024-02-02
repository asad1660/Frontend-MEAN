import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from './auth.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token:string;
  private authStatusListner = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer;
  constructor(private http:HttpClient,private router :Router) { }

  getToken() {
  return this.token;
  }
  getIsAuth(){
    return this.isAuthenticated;
  }
  getAuthStatusListener(){
    return this.authStatusListner.asObservable();
  }
  createUser(email:string, password:string){
    const authData:AuthData = {email:email,password:password}
    this.http.post('http://localhost:3000/api/user/signup',authData)
    .subscribe(response => {
     console.log(response);
    })
  }
  login(email:string, password:string){
    const authData:AuthData = {email:email,password:password}
    this.http.post<{token:string,expiresIn:number}>('http://localhost:3000/api/user/login',authData)
    .subscribe(response => {
     const token =response.token;
      this.token= token;
      if(token){
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration)
        this.isAuthenticated = true;
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token,expirationDate);
        this.authStatusListner.next(true);
        this.router.navigate(['/'])
      }
      
      console.log(response);

    })
  }
  autoAuthUser(){
    const authinformation = this.getAuthData();
    if(!authinformation){
      return;
    }
    const now = new Date();
    const expiresIn = authinformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0){
      this.token=this.getAuthData().token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000)
      this.authStatusListner.next(true);
    }
     
  }
  setAuthTimer(duration:number){
    this.tokenTimer = setTimeout(()=>{
      this.logout()
    },duration)
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListner.next(false)
    clearTimeout(this.tokenTimer)
    this.clearAuthData()
    this.router.navigate(['/'])
   
  }

  private saveAuthData(token:string,expirationDate:Date){
    localStorage.setItem('token',token);
    localStorage.setItem('expiration',expirationDate.toISOString());

  }
  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');

  }
private getAuthData(){
  const token =localStorage.getItem("token")
  const expirationDate =localStorage.getItem("expiration")
  if(!token && !expirationDate){
    return
  } 
  return {
    token:token,
    expirationDate:new Date(expirationDate)
  }
}

}

