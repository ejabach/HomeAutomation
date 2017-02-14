import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Task} from "./tasks.component";
import {Observable} from "rxjs";

@Injectable()
export class TasksService {
  private tasksUrl = 'api/tasks';

  constructor(private http: Http) { }

  getTasks(): Observable<Task[]>
  {
    return this.http.get(this.tasksUrl)
      .map(this.extractData)
      .catch(this.handleError)
  }

  private extractData(res: Response)
  {
    let body = res.json();
    return body.data || {};
  }

  private handleError(error: Response | any)
  {
    console.error(error);
    return Observable.throw(error);
  }

}
