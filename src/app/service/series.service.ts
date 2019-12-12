import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/internal/operators";
import {Series} from "../model/series";
import {Observable} from "rxjs/index";
import {Genre} from "../model/genre";
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(private http: HttpClient
              ) { }

  addNew(series: Series, file: any, genreList: Genre[]): Promise<Series> {
    console.log("Trying to save series named: " + series.title);
    const formData = new FormData();
    formData.append("series", JSON.stringify(series));
    formData.append("cover", file);
    formData.append("genres", JSON.stringify(genreList));
    return this.http.post<Series>(
      `api/series/save`,
      formData
    ).pipe(
      tap((series: Series) => {
        console.log("Successfully added series " + series.title);
      })
    ).toPromise();
  }

  getSeriesById(id: number): Promise<Series> {
      console.log("Getting series by id " + id);
      return this.http.get<Series>(`api/series/${id}`).toPromise();
    }

  getSeries(): Observable<Series[]> {
    return this.http.get<Series[]>('api/series/list-approved');
  }

  getNotApprovedSeries(): Observable<Series[]> {
      return this.http.get<Series[]>('api/series/list-not-approved');
  }

  getRecommended(id: UUID): Observable<Series[]> {
      return this.http.get<Series[]>(`api/series/recommended/${id}`);
  }

  getFirstTenSeries(): Observable<Series[]> {
    return this.http.get<Series[]>('api/series/first-ten');
  }

  getByGenre(name: String): Promise<Series[]> {
      console.log("Getting series by genre " + name);
      return this.http.get<Series[]>(`api/series/get-by-genre/${name}`).toPromise();
  }

  approveSeries(id: number, approved: boolean): Promise<Series> {
    console.log("Trying to approve series with id " + id);
    const formData = new FormData();
    formData.append("approved", JSON.stringify(approved));
    return this.http.post<Series>(
      `api/series/approve/${id}`,
      formData
      ).pipe(
        tap((series: Series) => {
          console.log("Succesfully approved series with id " + id);
        })
      ).toPromise();
  }

  deleteSeries(id: number) {
    console.log("Trying to delete series with id " + id);
        return this.http.delete(`api/series/delete/${id}`).pipe(
          tap(() => {
            console.log("Deleting title with id " + id + " was successful");
          })
        ).toPromise();
  }
}
