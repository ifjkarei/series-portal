import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Genre} from "../model/genre";
import {Song} from "../model/series";
import {User} from "../model/user";

@Injectable()
export class GenreService {

  constructor(
    private http: HttpClient
  ) {}

//TODO
  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>('api/genre/list');
  }

  getGenresByAlbum(user: User): Promise<Genre[]> {
    const formData = new FormData();
    formData.append("user", JSON.stringify(user));
    return this.http.post<Genre[]>(
      'api/genre/list-by-user',
      formData).toPromise();
  }

  getGenresBySong(series: Series): Promise<Genre[]> {
    const formData = new FormData();
    formData.append("series", JSON.stringify(series));
    return this.http.post<Genre[]>(
      'api/genre/list-by-series',
      formData
    ).toPromise();
  }
}
