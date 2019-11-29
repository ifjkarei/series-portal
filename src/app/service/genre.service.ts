import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Genre} from "../model/genre";
import {Series} from "../model/series";
import {User} from "../model/user";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(
    private http: HttpClient
  ) { }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>('api/genre/list');
  }

  getNonUserGenres(user: User): Promise<Genre[]> {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    return this.http.post<Genre[]>(
      'api/genre/list-not-user',
      formData).toPromise();
  }

  getGenresByUser(user: User): Promise<Genre[]> {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    return this.http.post<Genre[]>(
      'api/genre/list-by-user',
      formData).toPromise();
  }

  getGenresBySeries(series: Series): Promise<Genre[]> {
      const formData = new FormData();
      formData.append('series', JSON.stringify(series));
      return this.http.post<Genre[]>(
        'api/genre/list-by-series',
        formData).toPromise();
  }
}
