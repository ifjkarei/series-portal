import { Component, OnInit } from '@angular/core';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {SpinnerModule} from 'primeng/spinner';
import {SeriesService} from "../../../service/series.service";
import {Router} from "@angular/router";
import {Message} from 'primeng/components/common/api';
import {Series} from "../../../model/series";
import {Genre} from "../../../model/genre";
import {GenreService} from "../../../service/genre.service";
import { MessageService } from "primeng/api";
import { FileUploadModule } from 'primeng/fileupload';
import {Location} from '@angular/common';


@Component({
  selector: 'app-new-series',
  templateUrl: './new-series.component.html',
  styleUrls: ['./new-series.component.css'],
  providers: [MessageService]

})
export class NewSeriesComponent implements OnInit {
  series: Series = new Series();
  coverImg: any;
  imageUploading: boolean = false;
  seriesGenres: Genre[] = [];
  genreList: Genre[] = [];
  form: any;

  constructor(private seriesService:SeriesService,
              private genreService: GenreService,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit() {
    this.genreService.getGenres().subscribe(genres => this.genreList = genres);
  }

  async submit(f) {
    if(f.invalid) {
      return;
    }


    try {
      this.messageService.add({severity:'info', summary: 'Sending new series for approval', detail:''});
      await this.seriesService.addNew(this.series, this.coverImg, this.seriesGenres);
      this.messageService.add({severity:'success', summary: 'Successfully sent series for approval', detail:''});
    } catch (e) {
      this.messageService.add({severity:'error', summary: 'Something went wrong during sending', detail:''});
    }
    this.genreService.getGenres().subscribe(genres => this.genreList = genres);
    this.seriesGenres = [];
    this.series.release = 2010;
    this.form.clear();
  }

  uploadImage(event, form) {
    this.coverImg = event.files[0];
    this.messageService.add({ severity: 'success', summary: 'Cover has been uploaded', detail: 'You can add the series now'});
    console.log("Cover uploaded");
    this.imageUploading = true;
    this.form = form;
  }

}
