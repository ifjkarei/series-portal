import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {Genre} from "../model/genre";
import {Series} from "../model/series";
import {AuthService} from "./auth.service";
import {tap} from "rxjs/internal/operators";
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User = new User();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  updateUserGenres(likedGenres: Genre[]): Promise<User> {
    console.log("Trying to update favourite genres for user named " +
      this.authService.loggedInUser.username);
    const formData = new FormData();
    formData.append("likedgenres", JSON.stringify(likedGenres));
    return this.http.post<User>(
      `api/user/update/genres`,
      formData
    ).pipe(
      tap((user: User) => {
        console.log("User named " + this.authService.loggedInUser.username + " has been successfully updated with new genres");
        this.authService.isLoggedIn = true;
        this.authService.loggedInUser = user;
      })
    ).toPromise();
  }

  updateEmail(email: string): Promise<User> {
    console.log("Trying to update e-mail address for user named " + this.authService.loggedInUser.username);
    const formData = new FormData();
    formData.append("email", email);
    return this.http.post<User>(
      `api/user/update/email`,
      formData
    ).pipe(
      tap((user: User) => {
        this.authService.isLoggedIn = true;
        this.authService.loggedInUser = user;
        console.log("Successfully updated e-mail address for user named " + this.authService.loggedInUser.username);
      })
    ).toPromise();
  }

  getUser(id: UUID): Promise<User> {
    console.log("Getting user by id " + id);
    return this.http.get<User>(`api/user/${id}`).toPromise();
  }

  getToBeWatched(id: UUID): Promise<Series[]> {
    console.log("Getting to be watched series for " + id);
    return this.http.get<Series[]>(`api/user/${id}/tobewatched`).toPromise();
  }

  getNowWatching(id: UUID): Promise<Series[]> {
      console.log("Getting now watching series for " + id);
      return this.http.get<Series[]>(`api/user/${id}/nowwatching`).toPromise();
  }

  getWatched(id: UUID): Promise<Series[]> {
      console.log("Getting watched series for " + id);
      return this.http.get<Series[]>(`api/user/${id}/watched`).toPromise();
  }

  updateToBeWatched(series: Series): Promise<User> {
      console.log("Trying to update to be watched for user named " + this.authService.loggedInUser.username);
      const formData = new FormData();
      formData.append("tobewatched", JSON.stringify(series));
      return this.http.post<User>(
        `api/user/update/tobewatched`,
        formData
      ).pipe(
        tap((user: User) => {
          console.log("Successfully updated to be watched for user named " + this.authService.loggedInUser.username);
          this.authService.isLoggedIn = true;
          this.authService.loggedInUser = user;
        })
      ).toPromise();
  }

  updateNowWatching(series: Series): Promise<User> {
        console.log("Trying to update now watching for user named " + this.authService.loggedInUser.username);
        const formData = new FormData();
        formData.append("nowwatching", JSON.stringify(series));
        return this.http.post<User>(
          `api/user/update/nowwatching`,
          formData
        ).pipe(
          tap((user: User) => {
            console.log("Successfully updated now watching for user named " + this.authService.loggedInUser.username);
            this.authService.isLoggedIn = true;
            this.authService.loggedInUser = user;
          })
        ).toPromise();
  }

  updateWatched(series: Series): Promise<User> {
        console.log("Trying to update watched for user named " + this.authService.loggedInUser.username);
        const formData = new FormData();
        formData.append("watched", JSON.stringify(series));
        return this.http.post<User>(
          `api/user/update/watched`,
          formData
        ).pipe(
          tap((user: User) => {
            console.log("Successfully updated watched for user named " + this.authService.loggedInUser.username);
            this.authService.isLoggedIn = true;
            this.authService.loggedInUser = user;
          })
        ).toPromise();
  }

  removeFromToBeWatched(series: Series): Promise<User> {
        console.log("Trying to update to be watched for user named " + this.authService.loggedInUser.username);
        const formData = new FormData();
        formData.append("series", JSON.stringify(series));
        return this.http.post<User>(
          `api/user/remove/tobewatched`,
          formData
        ).pipe(
          tap((user: User) => {
            console.log("Successfully updated to be watched for user named " + this.authService.loggedInUser.username);
            this.authService.isLoggedIn = true;
            this.authService.loggedInUser = user;
          })
        ).toPromise();
    }
  removeFromNowWatching(series: Series): Promise<User> {
        console.log("Trying to update now watching for user named " + this.authService.loggedInUser.username);
        const formData = new FormData();
        formData.append("series", JSON.stringify(series));
        return this.http.post<User>(
          `api/user/remove/nowwatching`,
          formData
        ).pipe(
          tap((user: User) => {
            console.log("Successfully updated now watching for user named " + this.authService.loggedInUser.username);
            this.authService.isLoggedIn = true;
            this.authService.loggedInUser = user;
          })
        ).toPromise();
    }

  removeFromWatched(series: Series): Promise<User> {
      console.log("Trying to update watched for user named " + this.authService.loggedInUser.username);
      const formData = new FormData();
      formData.append("series", JSON.stringify(series));
      return this.http.post<User>(
        `api/user/remove/watched`,
        formData
      ).pipe(
        tap((user: User) => {
          console.log("Successfully updated watched for user named " + this.authService.loggedInUser.username);
          this.authService.isLoggedIn = true;
          this.authService.loggedInUser = user;
        })
      ).toPromise();
  }

  deleteUser(id: UUID) {
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
