import { Injectable } from '@angular/core';

import {AuthenticationService} from '../authentication/authentication.service';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Socket} from "./socket";

@Injectable()
export class SocketsService {
  private token: string;
  private socketsUrl: string = 'api/sockets';

  constructor(
    private http: Http,
    private authService: AuthenticationService
  ) {
    this.token = authService.user.token;
  }

  getSockets(): Observable<Socket[]>
  {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': this.token
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.socketsUrl, options)
      .map(this.extractSockets)
      .catch(this.handleError);
  }

  toggleSocket(socket: Socket): Observable<Socket>
  {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': this.token
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.socketsUrl + '/' + socket.name + '/toggle', {}, options)
      .map(this.extractSocket)
      .catch(this.handleError);
  }

  private extractSocket(res: Response)
  {
    let data = res.json();
    let socket: Socket = {
      _id: data._id,
      name: data.name,
      status: data.status,
      numbering: data.numbering
    }
    return socket || {};
  }

  private extractSockets(res: Response)
  {
    let dataList = res.json();
    let sockets = [];
    let socket: Socket;
    for(let element of dataList)
    {
      socket = {
        _id:  element._id,
        name: element.name,
        status: element.status,
        numbering: element.numbering
      };
      sockets.push(socket);
    }
    return sockets || [];
  }

  private handleError(res: Response | any)
  {
    console.error(res);
    return Observable.throw(res);
  }
}
