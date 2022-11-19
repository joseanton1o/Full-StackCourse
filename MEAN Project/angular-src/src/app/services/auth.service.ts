import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('users/register', user, {headers: headers})
      .map(res => res.json());
  }

  // Same as above but changing endpoint
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('users/profile', {headers: headers})
      .map(res => res.json());  
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token); //we use id_token as the key because it is the default key that passport uses
    localStorage.setItem('user', JSON.stringify(user)); // We cannot store objects in local storage so we stringify it
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // This method is used to check if the user is logged in or not
  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
