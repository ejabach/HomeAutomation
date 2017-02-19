export class Task {
  _id: string = '';
  name: string = '';
  done: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
