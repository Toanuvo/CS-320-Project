class Task {
  constructor(name, date, desc, priority) {
    this.name = name;
    this.desc = desc;
    this.date = date;
    this.priority = priority;
  }
}

class List {
  constructor() {
    this.tasks = [];
    this.points = 0;
    this.streak = 0;
  }

  addtask(name, date, priority, desc) {
    const task = new Task(name, date, priority, desc);
    this.tasks.push(task);
  }

  edittask(tasknum, name, date, priority, desc) {
    const task = this.tasks[tasknum];
    task.name = name;
    task.date = date;
    task.desc = desc;
    task.priority = priority;

    // change specific task in array for different needs
  }

  compeltetask(task) {
    this.points = this.points + this.streak + 1;
    this.removetask(task);
  }

  failtask(task) {

  }

  removetask(task) {
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }
}
console.log('controller loaded');

// todo subtasks, task sorting

// setup variables and objects
const addtaskB = document.getElementById('addtask_button');
const deletetaskB = document.getElementById('deletetask_button');
const clearinputB = document.getElementById('clearinput_button');
const taskdisplay = document.getElementById('tasks');
const pointsdisplay = document.getElementById('points');
const name = document.getElementById('name_input');
const date = document.getElementById('date_input');
const priority = document.getElementById('priority_input');
const desc = document.getElementById('desc_input');

const maintodolist = new List();
let curtask = -1;

// define controller functions
function displayTasks() {
  taskdisplay.innerHTML = '';
  let tempnum = 0;
  for (const t of maintodolist.tasks) {
    const TASK = document.createElement('DIV');
    TASK.className = 'ui raised segment';
    TASK.id = `task${tempnum}`;
    const NAME = document.createElement('DIV');
    const DATE = document.createElement('DIV');
    const PRIORITY = document.createElement('DIV');
    const sect = document.createElement('DIV');
    const EDIT_B = document.createElement('BUTTON');
    const COMPLETE_B = document.createElement('BUTTON');
    const DESC = document.createElement('DIV');

    sect.className = 'ui horizontal segments';
    NAME.className = 'ui segment';
    NAME.innerText = t.name;
    DATE.className = 'ui segment';
    DATE.innerText = t.date;
    PRIORITY.className = 'ui segment';
    PRIORITY.innerText = t.priority;
    DESC.className = 'ui raised segment';
    DESC.innerText = t.desc;

    EDIT_B.className = 'ui button';
    EDIT_B.id = `edittask${tempnum}`;
    EDIT_B.innerText = 'Edit Task';
    COMPLETE_B.className = 'ui button';
    COMPLETE_B.id = `completetask${tempnum}`;
    COMPLETE_B.innerText = 'Complete Task';

    // add listeners to buttons
    EDIT_B.addEventListener('click', editTask.bind(this, t));
    COMPLETE_B.addEventListener('click', completeTask.bind(this, t));

    sect.appendChild(NAME);
    sect.appendChild(DATE);
    sect.appendChild(PRIORITY);
    TASK.appendChild(sect);
    TASK.appendChild(DESC);
    TASK.appendChild(EDIT_B);
    TASK.appendChild(COMPLETE_B);
    taskdisplay.appendChild(TASK);
    tempnum++;
  }
  pointsdisplay.innerText = maintodolist.points;
}

function clearInput() {
  name.value = '';
  date.value = '';
  priority.value = '';
  desc.value = '';
  document.getElementById('task_editor_title').innerText = 'Inputs for a new task';
  curtask = -1;
  addtaskB.innerText = 'Add Task';
}

function addTask() {
  if (curtask !== -1) {
    maintodolist.edittask(curtask, name.value, date.value, priority.value, desc.value);
    curtask = -1;
    document.getElementById('task_editor_title').innerText = 'Inputs for a new task';
  } else {
    maintodolist.addtask(name.value, date.value, priority.value, desc.value);
  }
  displayTasks();
  clearInput();
}

function editTask(task) {
  curtask = maintodolist.tasks.indexOf(task);

  name.value = task.name;
  date.value = task.date;
  priority.value = task.priority;
  desc.value = task.desc;
  document.getElementById('task_editor_title').innerText = `editing task ${task.name}`;
  addtaskB.innerText = `reconfigure ${task.name}`;
}

function deleteTask() {
  if (curtask !== -1) {
    const task = maintodolist.tasks[curtask];
    maintodolist.removetask(task);
    curtask = -1;
  }

  displayTasks();
}

function completeTask(task) {
  maintodolist.compeltetask(task);
  displayTasks();
}

// attach listeners
addtaskB.addEventListener('click', addTask);
deletetaskB.addEventListener('click', deleteTask);
clearinputB.addEventListener('click', clearInput);
