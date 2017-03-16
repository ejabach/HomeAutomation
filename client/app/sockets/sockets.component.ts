import { Component, OnInit } from '@angular/core';
import {SocketsService} from "./sockets.service";
import {Socket} from "./socket";

@Component({
  selector: 'sockets-list',
  templateUrl: './sockets.component.html',
  styleUrls: ['./sockets.component.css'],
  providers: [SocketsService]
})
export class SocketsComponent implements OnInit {
  sockets: Socket[];

  constructor(
    private socketsService: SocketsService
  ) {
  }

  ngOnInit() {
    this.getSockets();
  }

  getSockets()
  {
    this.socketsService.getSockets()
      .subscribe(
      sockets => this.sockets = sockets
    );
  }

  toggleSocket(i: number)
  {
    let socket = this.sockets[i];
    this.socketsService.toggleSocket(socket)
      .subscribe(
        socket => this.sockets[i] = socket
      );
  }
}
