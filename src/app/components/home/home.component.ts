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

  constructor(private authService: AuthService,
              private userAuthService: UserAuthService,
              private router: Router) { }

  ngOnInit(): void {
  }
  login(loginForm: NgForm) {
    this.authService.login(loginForm.value).subscribe(
      (response:any)=>{
        
        this.userAuthService.setRole(response.user.role);
        this.userAuthService.setToken(response.jwtToken);

        console.log(response);

        const role = response.user.role;
        if(role === 'ROLE_ADMIN'){
          this.router.navigate(['/users']);
        }
        else if(role === 'ROLE_MANAGER'){
          this.router.navigate(['/tasks']);
        }
        else {
          this.router.navigate(['/']);
        }
      }
    );
  }

}
