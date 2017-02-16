import { Component, OnInit } from '@angular/core';
import {TasksService} from "./tasks.service";
import {Task} from "./task";

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

  toggleTask(i: number) {
    this.tasksService.toggleTask(this.tasks[i])
      .subscribe(
        task => this.tasks[i] = task
      );
  }

  ngOnInit() {
    this.getTasks();
  }
}
