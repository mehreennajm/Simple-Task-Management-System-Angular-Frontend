import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showErrorMessage = false;
  constructor(private authService: AuthService,
              private userAuthService: UserAuthService,
              private router: Router) { }

  ngOnInit(): void {
  }
  login(loginForm: NgForm) {
    
    this.authService.login(loginForm.value).subscribe({
      next: (response:any)=>{
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);
        this.userAuthService.setUsername(response.user.firstName + ' ' + response.user.lastName);
        const role = response.user.role;
        if(role == 'ROLE_ADMIN'){
          this.router.navigate(['/users']);
        }
        if(role == 'ROLE_MANAGER'){
          this.router.navigate(['/tasks']);
        }
        else { 
            this.showErrorMessage = true;
        }
      },
      error: ()=>{
        this.showErrorMessage=true;
      }
    });
  }
}
