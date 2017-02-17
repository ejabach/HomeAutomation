export class Task {
  _id: string;
  name: string = 'Unnamed';
  done: boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
