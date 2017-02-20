import { Component, OnInit } from '@angular/core';
import {TasksService} from "./tasks.service";
import {Task} from "./task";
import {MdDialog} from "@angular/material";
import {NewTaskDialogComponent} from "./new-task-dialog/new-task-dialog.component";

@Component({
  selector: 'task-list',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TasksService]
})
export class TasksComponent implements OnInit {
  tasks: Task[];

  constructor(
    private tasksService: TasksService,
    private dialog: MdDialog
  ) { }

  addNewTask()
  {
    let dialogResponse = this.dialog.open(NewTaskDialogComponent);
    dialogResponse.afterClosed().subscribe(
      result => {
        // Only if user entered a text
        // Necessary?
        if (result)
        {
          let newTask = new Task({name: result});
          this.tasksService.addNewTask(newTask)
            .subscribe(
              task => task._id ? this.tasks.push(task) : null
            );
        }
      }
    );
  }

  cleanTasks()
  {
    for (let task of this.tasks)
    {
      if (task.done)
      {
        this.tasksService.removeTask(task)
          .subscribe(
            tasks => this.tasks = tasks
          );
      }
    }
  }

  getTasks()
  {
    this.tasksService.getTasks()
      .subscribe(
        tasks => this.tasks = tasks
      );
  }

  toggleTask(i: number)
  {
    this.tasksService.toggleTask(this.tasks[i])
      .subscribe(
        task => this.tasks[i] = task
      );
  }

  ngOnInit()
  {
    this.getTasks();
  }
}
