import { Component, OnInit } from '@angular/core';
import {MenuItem} from "./menu-item";

@Component({
  selector: 'menu-container',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items: MenuItem[];

  constructor() {
    let dashboard = new MenuItem('Dashboard', '/dashboard', 'assessment');
    let rooms = new MenuItem('Rooms', '/rooms', 'home', [
      new MenuItem('Living Room', '/living'),
      new MenuItem('Bathroom', '/bath'),
    ]);
    let user = new MenuItem(this.getUserName(), '/user', 'person');

    this.items = [dashboard, rooms, user];
  }

  getUserName()
  {
    return 'Jan';
  }

  redirect(ref: string)
  {
    console.log('Redirecting to', ref);
  }

  ngOnInit() {
  }

}
