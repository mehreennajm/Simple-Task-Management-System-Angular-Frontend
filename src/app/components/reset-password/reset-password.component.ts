import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user-model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm:FormGroup;
  
   token = '';
   user: User;
  constructor(private http:HttpClient,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.resetForm =  this.formBuilder.group({
      resetToken:[''],
      password: ['',Validators.required],
      });
      
      this.activeRoute.queryParams.subscribe((queryParam)=>{
        this.token = queryParam['token'];
      })
  }




 
  onResetPassword(user:User){
    const url = "api/reset_password";
      this.http.post(url,user).subscribe((result)=>{
        console.log(result);
      })
  }




}
