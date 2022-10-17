import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }
  public setRoles(roles: []){
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(){
    return JSON.parse(localStorage.getItem("roles")|| '');
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string | null{
    return localStorage.getItem('jwtToken');
  }

  public setUsername(username: string) {
    localStorage.setItem('LoggedInStatus', username);
  }
  
  public getUsername(): string | null{
    return localStorage.getItem('LoggedInStatus');
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
    
  }
}
