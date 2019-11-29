import { Component, OnInit } from '@angular/core';
import { SeriesService } from "../../../service/series.service";
import { AuthService } from "../../../service/auth.service";
import { Series } from "../../../model/series";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css'],
  providers: [MessageService]
})
export class ApproveComponent implements OnInit {
  series: Series[];

  constructor(private seriesService: SeriesService,
              public authService: AuthService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.authService.getUser();
    this.getNotApproved();
  }

  getNotApproved() {
      this.seriesService.getNotApprovedSeries().subscribe(series => this.series = series);
  }

  async approveSeries(event: Event, series: Series) {
    await this.seriesService.approveSeries(series.id, true);
    this.messageService.add({ severity: 'success', summary: 'Successfully approved series ' + series.title, detail: ''});
    this.getNotApproved();
  }

  async deleteSeries(event: Event, series: Series) {
    await this.seriesService.deleteSeries(series.id);
    this.messageService.add({ severity: 'success', summary: 'Successfully deleted series ' + series.title, detail: ''});
    this.getNotApproved();
  }
}
