// eslint-disable-next-line max-classes-per-file
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

  addtask(name, date, priority) {
    const task = new Task(name, date, priority);
    this.tasks.push(task);
  }

  edittask(tasknum, name, date, desc, priority) {
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

// todo subtasks, add task desc functionality, task sorting

// setup variables and objects
const addtaskB = document.getElementById('addtask_button');
const deletetaskB = document.getElementById('deletetask_button');
const clearinputB = document.getElementById('clearinput_button');
const taskdisplay = document.getElementById('tasks');
const pointsdisplay = document.getElementById('points');
const name = document.getElementById('name_input');
const date = document.getElementById('date_input');
const priority = document.getElementById('priority_input');

const maintodolist = new List();
let curtask = -1;

// define controller functions
function displayTasks() {
  taskdisplay.innerHTML = '';
  let tempnum = 0;
  for (const t of maintodolist.tasks) {
    const T = document.createElement('DIV');
    T.className = 'ui raised segment';
    T.innerText = t.name;
    T.id = `task${tempnum}`;
    const D = document.createElement('DIV');
    const P = document.createElement('DIV');
    const sect = document.createElement('DIV');
    const B = document.createElement('BUTTON');
    const C = document.createElement('BUTTON');
    sect.className = 'ui horizontal segments';
    D.className = 'ui segment';
    D.innerText = t.date;
    P.className = 'ui segment';
    P.innerText = t.priority;
    B.className = 'ui button';
    B.id = `edittask${tempnum}`;
    B.innerText = 'Edit Task';
    C.className = 'ui button';
    C.id = `completetask${tempnum}`;
    C.innerText = 'Complete Task';

    // edit task function
    B.addEventListener('click', editTask.bind(this, t));
    C.addEventListener('click', completeTask.bind(this, t));

    sect.appendChild(D);
    sect.appendChild(P);
    T.appendChild(sect);
    T.appendChild(B);
    T.appendChild(C);
    taskdisplay.appendChild(T);
    tempnum++;
  }

  pointsdisplay.innerText = maintodolist.points;
}

function addTask() {
  if (curtask !== -1) {
    maintodolist.edittask(curtask, name.value, date.value, '', priority.value);
    curtask = -1;
    document.getElementById('task_editor_title').innerText = 'Inputs for a new task';
  } else {
    maintodolist.addtask(name.value, date.value, priority.value);
  }
  displayTasks();
  clearInput();
}

function editTask(task) {
  curtask = maintodolist.tasks.indexOf(task);

  name.value = task.name;
  date.value = task.date;
  priority.value = task.priority;
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

function clearInput() {
  name.value = '';
  date.value = '';
  priority.value = '';
  document.getElementById('task_editor_title').innerText = 'Inputs for a new task';
  curtask = -1;
  addtaskB.innerText = 'Add Task';
}

// attach listeners
addtaskB.addEventListener('click', addTask);
deletetaskB.addEventListener('click', deleteTask);
clearinputB.addEventListener('click', clearInput);
