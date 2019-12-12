import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Series } from "../../../model/series";
import { AuthService } from "../../../service/auth.service";
import {Genre} from "../../../model/genre";
import {UserService} from "../../../service/user.service";
import {GenreService} from "../../../service/genre.service";
import {SeriesService} from "../../../service/series.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {PickListModule} from 'primeng/picklist';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {switchMap} from "rxjs/internal/operators";
import {delay} from "q";
import { SelectItem } from 'primeng/primeng';
import { UUID } from 'angular2-uuid';


@Component({
  selector: 'app-series-detail',
  templateUrl: './series-detail.component.html',
  styleUrls: ['./series-detail.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class SeriesDetailComponent implements OnInit {

  series: Series = new Series();
  seriesGenres: Genre[] = [];
  genreList: Genre[] = [];
  coverImg: any = null;
  userId: UUID;
  listOptions: SelectItem[];

  titleEditDisplay: boolean = false;
  genreEditDisplay: boolean = false;
  releaseEditDisplay: boolean = false;
  descEditDisplay: boolean = false;
  longDescEditDisplay: boolean = false;

  constructor(
    public authService: AuthService,
    private userService: UserService,
    private seriesService: SeriesService,
    private genreService: GenreService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.loadSeries();
    this.userId = sessionStorage.getItem('id');

    this.listOptions = [
            {label: 'Will Watch', value: 'tobewatched'},
            {label: 'Watching', value: 'nowwatching'},
            {label: 'Watched', value: 'watched'}
        ];
  }

  loadSeries() {
    this.route.paramMap.pipe(switchMap(async (params: ParamMap) => {
              const id = params.get('id');
              await this.seriesService.getSeriesById(+id).then(
                (series: Series) => {
                  this.series = series;
                  this.seriesGenres = series.genres;
                  this.genreService.getNonSeriesGenres(series).then(data => { this.genreList = data });
                });
            })).subscribe();
  }

  showTitleDialog() {
        this.titleEditDisplay = true;
    }

  showGenreDialog() {
        this.genreEditDisplay = true;
    }

  showReleaseDialog() {
       this.releaseEditDisplay = true;
   }

  showDescDialog() {
      this.descEditDisplay = true;
   }

  showLongDescDialog() {
       this.longDescEditDisplay = true;
   }

   goBack() {
       this.location.back();
     }

  uploadImage(event) {
      this.coverImg = event.files[0];
      this.messageService.add({ severity: 'success', summary: 'Cover has been uploaded', detail: ''});
      console.log("Cover uploaded");
      this.updateSeries();
    }

  async updateSeries() {
    try {
      this.messageService.add({severity:'info', summary: 'Updating series', detail:''});
      await this.seriesService.addNew(this.series, this.coverImg, this.seriesGenres);
      this.coverImg = null;
      this.loadSeries();
      this.messageService.add({severity:'success', summary: 'Successfully updated series', detail:''});
    } catch (e) {
        this.messageService.add({severity:'error', summary: 'Series update was unsuccessful', detail:''});
    }
  }

  async deleteSeriesConfirm() {
      this.confirmationService.confirm({
        message: "Are you sure you want to delete this series?",
        header: 'Delete series',
        icon: 'fa fa-exclamation-triangle',
        accept: () => {
          this.deleteSeries();
        },
        reject: () => {
        }
      });
   }

  async deleteSeries() {
      try {
        this.messageService.add({severity:'info', summary: 'Deletion in progress', detail:''});
        await this.seriesService.deleteSeries(this.series.id);
        this.messageService.add({severity:'success', summary: 'Series has been deleted', detail:''});
        await delay(1000);
        this.router.navigate(['/all']);
      } catch (e) {
        this.messageService.add({severity:'error', summary: 'There was an error during deletion', detail:''});
      }
  }

  async onListChange(event: EventTarget, series: Series) {
      let value = (<HTMLInputElement>event).value;
      try {
        switch(value) {
          case "tobewatched": {
            this.messageService.add({severity:'info', summary: 'Adding series to Will Watch list', detail:''});
            await this.userService.updateToBeWatched(series);
            this.messageService.add({severity:'success', summary: 'Successfully added series to Will Watch list', detail:''});
            break;
          }
          case "nowwatching": {
            this.messageService.add({severity:'info', summary: 'Adding series to Now Watching list', detail:''});
            await this.userService.updateNowWatching(series);
            this.messageService.add({severity:'success', summary: 'Successfully added series to Now Watching list', detail:''});
            break;
          }
          case "watched": {
            this.messageService.add({severity:'info', summary: 'Adding series to Watched list', detail:''});
            await this.userService.updateWatched(series);
            this.messageService.add({severity:'success', summary: 'Successfully added series to Watched list', detail:''});
            break;
          }
        }
      } catch (e) {
        this.messageService.add({severity:'error', summary: 'Something went wrong during update', detail:''});
      }
    }
}
