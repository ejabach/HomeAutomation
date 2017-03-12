import { Component, OnInit } from '@angular/core';
import {MenuItem} from "./menu-item";
import {AuthenticationService} from "../authentication/authentication.service";
import {User} from "../authentication/user";

@Component({
  selector: 'menu-container',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items: MenuItem[];
  username: String;

  constructor(
    private authService: AuthenticationService
  ) {
    let dashboard = new MenuItem('Dashboard', '/dashboard', 'assessment');
    let rooms = new MenuItem('Rooms', '/rooms', 'home', [
      new MenuItem('Living Room', '/living'),
      new MenuItem('Bathroom', '/bath'),
    ]);
    let user = new MenuItem('Settings', '/settings', 'settings');

    this.items = [dashboard, rooms, user];
  }

  loggedIn()
  {
    return this.authService.isLoggedIn();
  }

  logout()
  {
    this.authService.logout();
  }

  ngOnInit() {
    this.username = this.authService.user.username;
  }

}
