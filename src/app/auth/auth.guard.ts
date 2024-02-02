import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export function authGuard(authService: AuthService,router:Router): CanActivateFn {
  // if (!authService.getIsAuth()){
  //   this.router.navigate(['./'])
  // }
  return (route, state) => this.authService.getIsAuth();
}