import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {tap} from "rxjs/operators";
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  redirectUrl: string = "";
  loggedInUser: User = new User();


  constructor(
    private http: HttpClient
  ) { }

  getUser() {
    console.log("Trying to get logged in user");
    this.http.get<User>('api/user/login').subscribe(
      (user : User) => {
        if (user !== null) {
          console.log("Logged in user found with name " + user.username);
          this.loggedInUser = user;
          this.isLoggedIn = true;
          if(user.role == "ADMIN") {
            this.isAdmin = true;
          }
          sessionStorage.setItem('id', <string>user.id);
          sessionStorage.setItem('username', user.username);
          window.dispatchEvent( new Event('storage') );
        } else {
        console.log("There is no logged in user");
        }
      }
    );
  }

  register(user: User, password: string) {
    console.log("Trying to register user with username " + user.username);

    const formData = new FormData();
    formData.append("user", JSON.stringify(user));
    formData.append("password", password);
    return this.http.post<User>(
      'api/user/register',
      formData
    ).pipe(
      tap((user: User) => {
        console.log("User named " + user.username + " has been successfully registered");
        this.loggedInUser = user;
        this.isLoggedIn = true;
        sessionStorage.setItem('id', <string>user.id);
        sessionStorage.setItem('username', user.username);
        window.dispatchEvent( new Event('storage') );
      })
    ).toPromise();
  }

  login(username: string, password: string) {
    console.log("Trying to login user with username " + username);
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    return this.http.post<User>(
      'api/user/login',
      formData
    ).pipe(
      tap((user: User) => {
        console.log("User named " + username + " has been successfully found and has been logged in");
        this.loggedInUser = user;
        this.isLoggedIn = true;
        if(user.role == "ADMIN") {
          this.isAdmin = true;
        }
        sessionStorage.setItem('id', <string>user.id);
        sessionStorage.setItem('username', user.username);
        window.dispatchEvent( new Event('storage') );
      })
    ).toPromise();
  }

  logout() {
    console.log("Trying to log out user with username " + this.loggedInUser.username);
    return this.http.get(
      'api/user/logout'
    ).pipe(
      tap(() => {
        console.log("Logged in user has been successfully logged out");
        this.loggedInUser = new User();
        this.isLoggedIn = false;
        this.isAdmin = false;
        window.dispatchEvent( new Event('storage') );
      })
    ).toPromise();
  }
}
