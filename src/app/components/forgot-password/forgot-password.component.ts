import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user-model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  submitForgetForm:FormGroup;
  showMsg: boolean = false;
  errMsg:string ='';

  constructor(private http:HttpClient,
              private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.submitForgetForm =  this.formBuilder.group({
      email: ['',Validators.required],
      });
  }

  onSubmit(user:User) {
      const url = "api/forgot_password";
      this.http.post(url,user).subscribe( 
      (next)=>{
        this.submitForgetForm.reset();
        this.showMsg = true;
      }
      ,
      (err) => {
        this.errMsg = err;
      });
   }

}
