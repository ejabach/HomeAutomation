import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Task} from "./task";
import {Observable} from "rxjs";

import {AuthenticationService} from '../authentication/authentication.service';

@Injectable()
export class TasksService {
  private tasksUrl = 'api/tasks/';
  private token: string;

  constructor(
    private http: Http,
    private authService: AuthenticationService
  ) {
    this.token = authService.user.token;
  }

  addNewTask(task: Task): Observable<Task>
  {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': this.token
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.tasksUrl, {name: task.name}, options)
      .map(this.extractTask)
      .catch(this.handleError);
  }

  removeTask(task: Task): Observable<Task[]>
  {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': this.token
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(this.tasksUrl + task._id, options)
      .map(this.extractTasks)
      .catch(this.handleError)
  }

  getTasks(): Observable<Task[]>
  {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': this.token
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.tasksUrl, options)
      .map(this.extractTasks)
      .catch(this.handleError)
  }

  toggleTask(task: Task): Observable<Task>
  {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': this.token
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.tasksUrl + task._id + '/toggle', options)
      .map(this.extractTask)
      .catch(this.handleError);
  }

  private extractTask(res: Response)
  {
    let data = res.json();
    let task: Task;
    task = {
      _id: data._id,
      name: data.name,
      done: data.done
    };
    return task;
  }

  private extractTasks(res: Response)
  {
    let dataList = res.json();
    let tasks = [];
    let task: Task;
    for(let element of dataList)
    {
      task = {
        _id:  element._id,
        name: element.name,
        done: element.done
      };
      tasks.push(task);
    }
    return tasks || [];
  }

  private handleError(error: Response | any)
  {
    console.error(error);
    return Observable.throw(error);
  }

}
