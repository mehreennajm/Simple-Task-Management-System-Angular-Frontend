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
  isLoading = false;

  constructor(private http:HttpClient,
              private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.submitForgetForm =  this.formBuilder.group({
      email: ['',Validators.email],
      });
  }

  onSubmit(user:User) {
    this.isLoading = true;
      const url = "api/forgot_password";
      this.http.post(url,user).subscribe( 
      (next)=>{
        this.submitForgetForm.reset();
        this.showMsg = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 3);
        setTimeout(() => {
          this.showMsg = false;
        }, 3000);

      });
   }

}
