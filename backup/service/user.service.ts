import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {Genre} from "../model/genre";
import {Series} from "../model/series";
import {AuthService} from "./auth.service";
import {tap} from "rxjs/internal/operators";

@Injectable()
export class UserService {

  user: User = new User();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  updateGenres(id: number, likedGenres: Genre[]): Promise<User> {
    console.log("Trying to update favourite genres for user named " +
      this.authService.loggedInUser.username);
    const formData = new FormData();
    formData.append("likedGenres", JSON.stringify(likedGenres));
    return this.http.post<User>(
      `api/user/update/${id}/genres`,
      formData
    ).pipe(
      tap((user: User) => {
        console.log("User named " +
          this.authService.loggedInUser + " has been successfully updated with new genres")
        this.authService.isLoggedIn = true;
        this.authService.loggedInUser = user;
      })
    ).toPromise();
  }

  updateEmail(id: number, emailAddress: string): Promise<User> {
    const formData = new FormData();
    formData.append("emailAddress", emailAddress);
    return this.http.post<User>(
      `api/user/update/${id}/email`,
      formData
    ).pipe(
      tap((user: User) => {
        this.authService.isLoggedIn = true;
        this.authService.loggedInUser = user;
      })
    ).toPromise();
  }

  getUser(id: number): Promise<User> {
    return this.http.get<User>(`api/user/${id}`).toPromise();
  }

  getToBeWatched(id: number): Promise<Series[]> {
    return this.http.get<User>('api/user/${id}/tobewatched').toPromise();
  }
  //TODO Watched, Watching, GET and POST

  deleteUser(id: number) {
    console.log("Trying to delete user named " + this.authService.loggedInUser.username);
    return this.http.delete(`api/user/delete/${id}`).pipe(
      tap(() => {
        console.log("Deleting user named " + this.authService.loggedInUser.username + " was successful");
        this.authService.isLoggedIn = false;
        this.authService.loggedInUser = new User();
      })
    ).toPromise();
  }
}
