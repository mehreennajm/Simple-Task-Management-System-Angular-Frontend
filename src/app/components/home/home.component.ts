import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  login(loginForm: NgForm) {
    this.authService.login(loginForm.value).subscribe({
      next: response => {
       console.log(response);
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
