import { Component, OnInit } from '@angular/core';
import {DataViewModule} from 'primeng/dataview';
import { Series } from "../../../model/series";
import {Genre} from "../../../model/genre";
import {User} from "../../../model/user";
import { SeriesService } from "../../../service/series.service";
import { AuthService } from "../../../service/auth.service";
import { UserService } from "../../../service/user.service";
import {GenreService} from "../../../service/genre.service";
import { SelectItem } from 'primeng/primeng';
import { MessageService } from "primeng/api";
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css'],
  providers: [ MessageService]
})
export class RecommendedComponent implements OnInit {
  series: Series[];
  selectedSeries: Series;
  sortOptions: SelectItem[];
  listOptions: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;
  userId: UUID;
  selected: string = "";
  display: boolean = false;

  constructor(private seriesService: SeriesService,
              public authService: AuthService,
              private userService: UserService,
              private messageService: MessageService,
              private genreService: GenreService,) { }

  ngOnInit() {
    this.authService.getUser();
    this.userId = sessionStorage.getItem('id');
    this.getRecommendedSeries();

    this.sortOptions = [
        {label: 'Newest First', value: '!release'},
        {label: 'Oldest First', value: 'release'},
        {label: 'Title', value: 'title'},
        {label: 'Most watched', value: '!watched'},
        {label: 'Least watched', value: 'watched'},
        {label: 'Most Watching', value: '!watching'},
        {label: 'Least Watching', value: 'watching'}
    ];

    this.listOptions = [
        {label: 'Will Watch', value: 'tobewatched'},
        {label: 'Watching', value: 'nowwatching'},
        {label: 'Watched', value: 'watched'}
    ];
  }

  showDetails() {
      this.display = this.display ? false: true;
    }

  getRecommendedSeries() {
    this.seriesService.getRecommended(this.userId).subscribe(series => this.series = series);
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }

  async onListChange(event: EventTarget, series: Series) {
    let value = (<HTMLInputElement>event).value;
    try {
      switch(value) {
        case "tobewatched": {
          this.messageService.add({severity:'info', summary: 'Adding series to Will Watch list', detail:''});
          await this.userService.updateToBeWatched(this.userId, series);
          this.messageService.add({severity:'success', summary: 'Successfully added series to Will Watch list', detail:''});
          this.getRecommendedSeries();
          break;
        }
        case "nowwatching": {
          this.messageService.add({severity:'info', summary: 'Adding series to Now Watching list', detail:''});
          await this.userService.updateNowWatching(this.userId, series);
          this.messageService.add({severity:'success', summary: 'Successfully added series to Now Watching list', detail:''});
          this.getRecommendedSeries();
          break;
        }
        case "watched": {
          this.messageService.add({severity:'info', summary: 'Adding series to Watched list', detail:''});
          await this.userService.updateWatched(this.userId, series);
          this.messageService.add({severity:'success', summary: 'Successfully added series to Watched list', detail:''});
          this.getRecommendedSeries();
          break;
        }
      }
    } catch (e) {
      this.messageService.add({severity:'error', summary: 'Something went wrong during update', detail:''});
    }
  }
}
