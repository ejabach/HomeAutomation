import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task';

@Pipe({
  name: 'tasksDone',
  pure: false
})
export class TasksDonePipe implements PipeTransform {

  transform(tasks: Task[], args?: any): Task[]{
    if (tasks)
    {
      return tasks.filter(
        task => !task.done
      );
    } else {
      return [];
    }
  }

}
