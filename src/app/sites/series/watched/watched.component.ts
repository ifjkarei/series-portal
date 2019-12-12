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
  selector: 'app-watched',
  templateUrl: './watched.component.html',
  styleUrls: ['./watched.component.css'],
  providers: [ MessageService]
})
export class WatchedComponent implements OnInit {
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
              private genreService: GenreService,) {

              }

  async ngOnInit() {
    this.authService.getUser();
    this.userId = sessionStorage.getItem('id');
    this.getSeries();


    this.sortOptions = [
        {label: 'Newest First', value: '!release'},
        {label: 'Oldest First', value: 'release'},
        {label: 'Title', value: 'title'}
    ];

    this.listOptions = [
        {label: 'Will Watch', value: 'tobewatched'},
        {label: 'Watching', value: 'nowwatching'}
    ];
  }

  showDetails() {
      this.display = this.display ? false: true;
    }

  getSeries() {
    this.userService.getWatched(this.userId).then(series => this.series = series);
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

  async removeSeries(event: EventTarget, series: Series) {
    try {
          this.messageService.add({severity:'info', summary: 'Removing series from My Series', detail:''});
          await this.userService.removeFromWatched(series);
          this.messageService.add({severity:'success', summary: 'Successfully removed series', detail:''});
          this.getSeries();
        } catch (e) {
          this.messageService.add({severity:'error', summary: 'Something went wrong during update', detail:''});
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
          this.getSeries();
          break;
        }
        case "nowwatching": {
          this.messageService.add({severity:'info', summary: 'Adding series to Now Watching list', detail:''});
          await this.userService.updateNowWatching(series);
          this.messageService.add({severity:'success', summary: 'Successfully added series to Now Watching list', detail:''});
          this.getSeries();
          break;
        }
      }
    } catch (e) {
      this.messageService.add({severity:'error', summary: 'Something went wrong during update', detail:''});
    }
  }
}
