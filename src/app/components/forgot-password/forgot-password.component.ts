import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user-model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  submitForgetForm:FormGroup;
  showMsg: boolean = false;
  showMsg1: boolean = false;

  constructor(private http:HttpClient,
              private toastr: ToastrService,
              private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.submitForgetForm =  this.formBuilder.group({
      email: ['',Validators.required],
      });
  }

  onSubmit(user:User) {
      const url = "api/forgot_password";
      const k = this.http.post(url,user).subscribe((results) => {
        
      });
      if(k){
        this.showMsg= true;
      }
      else{
        this.showMsg1 = true;
      }
   }

}
