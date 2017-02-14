import { Component, OnInit } from '@angular/core';
import {TasksService} from "./tasks.service";

@Component({
  selector: 'task-list',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TasksService]
})
export class TasksComponent implements OnInit {
  tasks: Task[];

  constructor(private tasksService: TasksService) { }

  getTasks() {
    this.tasksService.getTasks()
      .subscribe(
        tasks => this.tasks = tasks
      );
  }

  toggleTask(i) {
    this.tasks[i] != this.tasks[i];
  }

  ngOnInit() {
    this.getTasks();
  }

}

export interface Task {
  name: string;
  done: boolean;
}
