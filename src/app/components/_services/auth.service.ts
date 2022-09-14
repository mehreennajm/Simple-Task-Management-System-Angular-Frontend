
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  PATH_OF_API = 'api';
  httpOptions = new HttpHeaders({"No-Auth": "True"});
  
  constructor(
    private httpClient:HttpClient,
  ) { }

  public login(loginData:any) {
    return this.httpClient.post(this.PATH_OF_API+ '/authenticate',loginData,{headers:this.httpOptions});
  }

  
  
} 
