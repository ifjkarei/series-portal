import { Component, OnInit } from '@angular/core';
import { User } from "../../../model/user";
import { AuthService } from "../../../service/auth.service";
import { UserService } from "../../../service/user.service";
import {Genre} from "../../../model/genre";
import {GenreService} from "../../../service/genre.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {PickListModule} from 'primeng/picklist';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {switchMap} from "rxjs/internal/operators";
import {delay} from "q";
import {Location} from '@angular/common';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class UserDetailComponent implements OnInit {

  user: User = new User();
  userGenres: Genre[] = [];
  genreList: Genre[] = [];
  userNewEmail: string = "";
  userNewEmailConfirm: string = "";


  emailEditDisplay: boolean = false;

  constructor(
    public authService: AuthService,
    private userService: UserService,
    private genreService: GenreService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(switchMap(async (params: ParamMap) => {
          const id = params.get('id');
          await this.userService.getUser(id).then(
            (user: User) => {
              this.user = user;
              this.genreService.getGenresByUser(user).then(data => { this.userGenres = data });
              this.genreService.getNonUserGenres(user).then(data => { this.genreList = data });

            });
        })).subscribe();
  }

  showEmailDialog() {
      this.emailEditDisplay = true;
    }

    async updateGenres() {
      try {
        this.messageService.add({severity:'info', summary: 'Updating liked genres', detail:''});
        await this.userService.updateUserGenres(this.user.id, this.userGenres);
        this.messageService.add({severity:'success', summary: 'Successfully updated liked genres', detail:''});
      } catch (e) {
          this.messageService.add({severity:'error', summary: 'Genre update was unsuccessful', detail:''});
      }
    }

    async changeEmail() {
        try {
          this.messageService.add({severity:'info', summary: 'Changing e-mail address', detail:''});
          if(this.user.email === this.userNewEmail) {
            this.messageService.add({severity:'error', summary: 'E-mail address is the same as old one!', detail:''});
          } else {
            await this.userService.updateEmail(this.user.id, this.userNewEmail);
            this.user.email = this.authService.loggedInUser.email;
            this.messageService.add({severity:'success', summary: 'E-mail address changed successfully', detail:''});
          }
        } catch (e) {
          this.messageService.add({severity:'error', summary: 'E-mail address change unsuccessful', detail:''});
        }
      }

    async deleteUserConfirm() {
        this.confirmationService.confirm({
          message: "Are you sure you want to delete your account?",
          header: 'Delete registration',
          icon: 'fa fa-exclamation-triangle',
          accept: () => {
            this.deleteUser();
          },
          reject: () => {
          }
        });
     }

    async deleteUser() {
        try {
          this.messageService.add({severity:'info', summary: 'Deletion in progress', detail:''});
          await this.userService.deleteUser(this.user.id);
          this.messageService.add({severity:'success', summary: 'User has been deleted', detail:''});
          await delay(1000);
          this.router.navigate(['/login']);
        } catch (e) {
          this.messageService.add({severity:'error', summary: 'There was an error during deletion', detail:''});
        }
    }
}
