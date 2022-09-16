import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private userAuthService:UserAuthService, 
              private router:Router,
              public authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(){
      this.userAuthService.clear();
      this.router.navigate(['/']);
  }

}
