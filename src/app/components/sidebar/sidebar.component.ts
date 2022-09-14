import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user-model';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private userAuthService:UserAuthService, private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
      this.userAuthService.clear();
      this.router.navigate(['/']);
  }

}
