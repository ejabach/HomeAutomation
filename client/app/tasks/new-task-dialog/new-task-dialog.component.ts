import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.css']
})
export class NewTaskDialogComponent implements OnInit {
  newTaskTitle: string;

  constructor(public dialogRef: MdDialogRef<NewTaskDialogComponent>) {}

  ngOnInit() {
  }

}
