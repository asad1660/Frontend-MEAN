import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root',
})
 export class PermissionsService {

 constructor(
 private authService: AuthService,
 public router: Router,
 ) { }

 canActivate(): any {
 if (this.authService.getIsAuth()) {
   return true
 } else {
   this.router.navigate(['/']);
   return false
   }
 }

 }

export function authGuard(authService: AuthService,router:Router): CanActivateFn {
  return inject(PermissionsService).canActivate();
}