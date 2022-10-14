
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  PATH_OF_API = 'api';
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  
  
  constructor(
    private httpClient:HttpClient,
    private userAuthService: UserAuthService
  ) { }

  public login(loginData:any) {
    return this.httpClient.post(this.PATH_OF_API+ '/authenticate',loginData,{headers:this.requestHeader,});
  }

  public roleMatch(allowedRoles:any) :boolean{
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();
    if(userRoles) {
      for(let i = 0; i< userRoles.length; i++) {
        if(allowedRoles.indexOf(userRoles) !== -1){
         isMatch = true;
         break;
        }
      }
    }
    return isMatch;
    }

  
  
} 
