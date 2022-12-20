import { HttpClient} from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router} from '@angular/router';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  resetForm:FormGroup;
  
   userToken = '';
   
   showMsg = false;
  constructor(private http:HttpClient,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute) { }


    
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((queryParam)=>{
      this.userToken = queryParam['token'];
    });
    this.resetForm =  this.formBuilder.group({
      password: ['',Validators.required],
      });  
  }




 
  onResetPassword(password:string){
    const url = "api/reset_password?token="+this.userToken;
      this.http.put(url,password).subscribe((result)=>{
        this.showMsg = true;
      });

      
  }




}
