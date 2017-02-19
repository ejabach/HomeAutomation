import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Task} from "./task";
import {Observable} from "rxjs";

@Injectable()
export class TasksService {
  private tasksUrl = 'api/tasks/';

  constructor(private http: Http) { }

  addNewTask(task: Task): Observable<Task>
  {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.tasksUrl, {name: task.name}, options)
      .map(this.extractTask)
      .catch(this.handleError);
  }

  getTasks(): Observable<Task[]>
  {
    return this.http.get(this.tasksUrl)
      .map(this.extractTasks)
      .catch(this.handleError)
  }

  toggleTask(task: Task): Observable<Task>
  {
    return this.http.get(this.tasksUrl + task._id + '/toggle')
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
