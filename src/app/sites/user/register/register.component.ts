import { Component, OnInit } from '@angular/core';
import {User} from "../../../model/user";
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";
import {Message} from 'primeng/components/common/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  emailAddressConfirm: string = "";
  password: string = "";
  passwordConfirm: string = "";
  msgs: Message[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  async submit(f) {
    if(f.invalid) {
      return;
    }
    try {
      this.user.role = "USER";
      this.showMsgInfo();
      await this.authService.register(this.user, this.password);
      console.log("Successful registration");
      this.showMsgSuccess();
      console.log("Try to login with user named " + this.authService.loggedInUser.username + " and with id " + this.authService.loggedInUser.id);
      await new Promise( resolve => setTimeout(resolve, 1000) );
      this.router.navigate(['/user', this.authService.loggedInUser.id]);
    } catch (e) {
      this.showMsgError();
      console.log(e);
    }
  }

  showMsgInfo() {
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'Registration in progress', detail:''});
  }

  showMsgSuccess() {
    this.msgs = [];
    this.msgs.push({severity:'success', summary:'Successful registration', detail:''});
  }

  showMsgError() {
    this.msgs = [];
    this.msgs.push({severity:'error', summary:'Registration unsuccessful', detail:''});
  }
}
