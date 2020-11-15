// eslint-disable-next-line max-classes-per-file
class Task {
  constructor(name, date, desc, priority) {
    this.desc = desc;
    this.name = name;
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

  edittask(task, name, data, desc, priority) {
    // change specific task in array for different needs
  }

  compeltetask(task) {

  }

  failtask(task) {

  }

  removetask(task) {
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }
}
console.log('controller script loaded');

// setup variables and objects
const addtaskB = document.getElementById('addtask_button');
const deletetaskB = document.getElementById('deletetask_button');
const taskdisplay = document.getElementById('tasks');
const maintodolist = new List();
let tasknum = 0;

// define controller functions
function displaytasks() {
  for (const t of maintodolist.tasks) {
    const T = document.createElement('DIV');
    T.className = 'ui raised segment';
    T.innerText = t.name;
    T.id = `task${tasknum}`;
    const D = document.createElement('DIV');
    const P = document.createElement('DIV');
    const sect = document.createElement('DIV');
    sect.className = 'ui horizontal segments';
    D.className = 'ui segment';
    D.innerText = t.date;
    P.className = 'ui segment';
    P.innerText = t.priority;

    sect.appendChild(D);
    sect.appendChild(P);
    T.appendChild(sect);
    taskdisplay.appendChild(T);
  }
}

function addtask() {
  const name = document.getElementById('name_input');
  const date = document.getElementById('date_input');
  const priority = document.getElementById('priority_input');
  maintodolist.addtask(name.value, date.value, priority.value);
  displaytasks();

  name.value = '';
  date.value = '';
  priority.value = '';
  tasknum++;
}

function deletetask() {
  const name = document.getElementById('name_input');
  console.log(name.value);

  let curnum;
  for (const t of maintodolist.tasks) {
    if (t.name === name.value) {
      curnum = maintodolist.tasks.indexOf(t);
      maintodolist.removetask(t);
    }
  }

  document.getElementById(`task${curnum}`).remove();
  tasknum--;
}

// attach listeners
addtaskB.addEventListener('click', addtask);
deletetaskB.addEventListener('click', deletetask);
