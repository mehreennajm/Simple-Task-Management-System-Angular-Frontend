import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: User;
  constructor() { }

  authenticate(username:string, password:string) {
    if (this.user.username === username && this.user.password === password) {
      sessionStorage.setItem('username', username)
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}