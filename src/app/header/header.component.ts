import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit,OnDestroy {
  private authListnerSubs:Subscription;
  userIsAuthenticated = false;

  constructor(public authService: AuthService) { }
  
  ngOnInit() {
   this.authListnerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated =>{
     this.userIsAuthenticated = isAuthenticated;
    });
  }

  onLogout(){
    this.authService.logout()
  }
  ngOnDestroy() {
 this.authListnerSubs.unsubscribe();
  }
}
