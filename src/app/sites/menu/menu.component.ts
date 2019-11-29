import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import { Subscription  } from 'rxjs';
import {Location} from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getUser();
    this.initializeItems();
    window.addEventListener('storage', () => {
      this.initializeItems();
    });
  }

  initializeItems() {
    if(this.authService.isLoggedIn) {
      if(this.authService.isAdmin) {
        this.items = [
                      { label: 'Home', icon: 'fa fa-home', routerLink: ['/main-page'] },
                      { label: 'Series',
                        items: [
                          { label: 'New Series', routerLink: ['/new'] },
                          { label: 'Approve Series', routerLink: ['/approve'] },
                          { label: 'All series', routerLink: ['/all'] },
                          { label: 'Recommended', routerLink: ['/recommended'] }
                        ]},
                      { label: 'My Series',
                        items: [
                          { label: 'Will Watch', routerLink: ['/tobewatched'] },
                          { label: 'Watching', routerLink: ['/nowwatching'] },
                          { label: 'Watched', routerLink: ['/watched'] }

                        ]},
                      { icon: 'fa fa-user', label: sessionStorage.getItem('username'), routerLink: ['/user', sessionStorage.getItem('id')]},
                      { label: 'Logout', icon: 'fa fa-sign-out', command: (click) => {this.logout()}}
                      ];
      } else {
        this.items = [
                         { label: 'Home', icon: 'fa fa-home', routerLink: ['/main-page'] },
                         { label: 'Series',
                           items: [
                             { label: 'New Series', routerLink: ['/new'] },
                             { label: 'All series', routerLink: ['/all'] },
                             { label: 'Recommended', routerLink: ['/recommended'] }
                           ]},
                         { label: 'My Series',
                           items: [
                             { label: 'Now Watching', routerLink: ['/nowwatching'] },
                             { label: 'Watched', routerLink: ['/watched'] },
                             { label: 'Will watch', routerLink: ['/tobewatched'] }
                           ]},
                         { icon: 'fa fa-user', label: sessionStorage.getItem('username'), routerLink: ['/user', sessionStorage.getItem('id')]},
                         { label: 'Logout', icon: 'fa fa-sign-out', command: (click) => {this.logout()}}
                         ];
      }
    } else {
      this.items = [
                    { label: 'Home', icon: 'fa fa-home', routerLink: ['/main-page'] },
                    { label: 'Series',
                      items: [
                        { label: 'All series', routerLink: ['/all'] }
                      ]},
                    { label: 'Login', icon: 'fa fa-sign-in', routerLink: ['/login'] },
                    { label: 'Register', icon: 'fa fa-user-plus', routerLink: ['/register'] }
                    ];
    }
  }

  async logout() {
    try {
      await this.authService.logout();
      this.initializeItems();
      this.router.navigate(["/"]);
    } catch (err) {
      console.log(err);
    }
  }
}
