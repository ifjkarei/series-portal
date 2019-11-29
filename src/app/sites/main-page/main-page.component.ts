import { Component, OnInit } from '@angular/core';
import { Series } from "../../model/series";
import { SeriesService } from "../../service/series.service";
import { AuthService } from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  series: Series[];
  responsiveOptions;
  display: boolean = false;

  constructor(private seriesService: SeriesService,
              private router: Router,
              public authService: AuthService) {
    this.responsiveOptions = [
                {
                    breakpoint: '1024px',
                    numVisible: 3,
                    numScroll: 3
                },
                {
                    breakpoint: '768px',
                    numVisible: 2,
                    numScroll: 2
                },
                {
                    breakpoint: '560px',
                    numVisible: 1,
                    numScroll: 1
                }
            ];
    }

  ngOnInit() {
    this.authService.getUser();
    this.seriesService.getFirstTenSeries().subscribe((series:Series[]) => {
                this.series = series;
            });
  }

  showDetails() {
    this.display = true;
  }
}
