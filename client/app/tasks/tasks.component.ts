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
  newTask: Task;

  constructor(private tasksService: TasksService) { }

  addNewTask() {
    this.tasksService.addNewTask(this.newTask)
      .subscribe(
        task => task._id ? this.tasks.push(task) : null
      );
    this.newTask = new Task();
  }

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
    this.newTask = new Task();
  }
}
