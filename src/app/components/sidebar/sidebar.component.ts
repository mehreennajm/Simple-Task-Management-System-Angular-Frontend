import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user-model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(public loginService:AuthenticationService) { }

  ngOnInit(): void {
  }

}
