import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user-model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm:FormGroup;

  user: User;
  constructor(private http:HttpClient,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.resetForm =  this.formBuilder.group({
      password: ['',Validators.required],
      });

     
  }


 
  onResetPassword(user: User){
    const url = "api/reset_password";
      this.http.put(url,user).subscribe((result)=>{
        this.router.navigate(['/login']);
       
        console.log(result);
      })
  }




}
