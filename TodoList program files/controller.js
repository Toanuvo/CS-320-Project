// eslint-disable-next-line max-classes-per-file
class Task {
  constructor(name, date, priority) {
    this.name = name;
    this.date = date;
    this.priority = priority;
  }
}

class List {
  constructor() {
    this.tasks = [];
  }

  addtask(name, date, priority) {
    const task = new Task(name, date, priority);
    this.tasks.push(task);
  }
}
console.log('controller script loaded');

// setup variables and objects
const addtaskB = document.getElementById('addtask_button');
const taskdisplay = document.getElementById('tasks');
const maintodolist = new List();
let tasknum = 0;

// define controller functions
function addtask() {
  tasknum++;
  const name = document.getElementById('name_input');
  const date = document.getElementById('date_input');
  const priority = document.getElementById('priority_input');
  maintodolist.addtask(name.value, date.value, priority.value);

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

  name.value = '';
  date.value = '';
  priority.value = '';
}

// attach listeners
addtaskB.addEventListener('click', addtask);
