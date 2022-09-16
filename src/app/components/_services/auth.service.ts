
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
    return this.httpClient.post(this.PATH_OF_API+ '/authenticate',loginData,{headers:this.requestHeader});
  }

  public roleMatch(allowedRole:any): boolean | undefined{
    let isMatch = false;
    const userRole: any = this.userAuthService.getRole();
    try {
        if (userRole != null && userRole === allowedRole)
        {
                isMatch = true;
                return isMatch
        }
        else{
          return isMatch;
        }
   } catch (err) {
     console.log(err);
   }
    
  }
  
} 
