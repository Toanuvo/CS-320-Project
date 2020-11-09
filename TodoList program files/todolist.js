import Task from './task';

export default class List {
  constructor() {
    this.tasks = [];
  }

  addtask() {
    const task = new Task.Task();
    this.tasks.append(task);
  }
}
