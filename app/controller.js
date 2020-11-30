class Task {
  constructor(name, date, priority, desc, parenttask) {
    this.name = name;
    this.desc = desc;
    this.date = new Date(date);
    this.priority = priority;
    this.subtasks = [];
    this.parenttask = parenttask;
  }

  addsubtask(task) {
    task.addparent(this);
    this.subtasks.push(task);
  }

  removesubtask(task) {
    this.subtasks.splice(this.subtasks.indexOf(task), 1);
  }

  addparent(task) {
    this.parenttask = task;
  }
}

class List {
  constructor() {
    this.username = 'User';
    this.tasks = [];
    this.subtasks = [];
    this.points = 0;
    this.streak = 0;
    this.date = new Date();
  }

  changeUsername(name) {
    this.username = name;
  }

  addtask(name, date, priority, desc, tasknum) {
    const task = new Task(name, date, priority, desc);
    if (tasknum !== undefined) {
      const parenttask = this.tasks[tasknum];
      this.subtasks.push(task);
      parenttask.addsubtask(task);
    } else {
      this.tasks.push(task);
    }
  }

  edittask(tasknum, name, date, priority, desc, subtask) {
    let task;
    if (subtask) {
      task = this.subtasks[tasknum];
    } else { task = this.tasks[tasknum]; }
    task.name = name;
    task.date = new Date(date);
    task.desc = desc;
    task.priority = priority;

    // change specific task in array for different needs
  }

  compeltetask(task) {
    this.points *= (this.streak + 1);
    this.removetask(task);
  }

  failtask(task) {

  }

  removetask(task) {
    if (task.parenttask === undefined) {
      this.tasks.splice(this.tasks.indexOf(task), 1);
    } else {
      task.parenttask.removesubtask(task);
      this.subtasks.splice(this.subtasks.indexOf(task), 1);
    }
  }

  sortAZ() {
    this.tasks.sort((a, b) => (strToInt(a.name) - strToInt(b.name)));
  }

  sortZA() {
    this.tasks.sort((a, b) => (strToInt(b.name) - strToInt(a.name)));
  }

  sort01() {
    this.tasks.sort((a, b) => (a.priority - b.priority));
  }

  sort10() {
    this.tasks.sort((a, b) => (b.priority - a.priority));
  }

  sortDate() {
    this.tasks.sort((a, b) => (a.date - b.date));
  }
}
console.log('controller loaded');

// todo subtasks, task sorting

// setup variables and objects
const addtaskB = document.getElementById('addtask_button');
const deletetaskB = document.getElementById('deletetask_button');
const clearinputB = document.getElementById('clearinput_button');
const applybgB = document.getElementById('apply_background_setting');
const usernameB = document.getElementById('username_button');
const sortBs = document.querySelectorAll('[data-sortB]');
const taskdisplay = document.getElementById('tasks');
const pointsdisplay = document.getElementById('points');
const homepagetaskdisplay = document.getElementById('homepage_tasks');
const name = document.getElementById('name_input');
const date = document.getElementById('date_input');
const priority = document.getElementById('priority_input');
const desc = document.getElementById('desc_input');
const datedisplay = document.getElementById('currentdate');

const maintodolist = new List();
let curtask = -1;
let addingsubtask = false;
let editsubtask = false;

// define controller functions

// displays all tasks by creating the html for them
function displayTasks() {
  taskdisplay.innerHTML = '';
  let tempnum = 0;
  for (const t of maintodolist.tasks) {
    const TASK = createTaskHTML(t, tempnum, false);
    tempnum++;
    for (const s of t.subtasks) {
      const SUB = createTaskHTML(s, tempnum, true);
      TASK.appendChild(SUB);
      tempnum++;
    }
    taskdisplay.appendChild(TASK);
  }
  pointsdisplay.innerText = maintodolist.points;
  displayHomePageTasks();
}

// helped function to create the html for tasks
function createTaskHTML(t, tempnum, subtask) {
  const TASK = document.createElement('DIV');

  // change task look depending on type
  if (subtask) {
    TASK.className = 'ui secondary segment';
  } else if (t.date < maintodolist.date) {
    TASK.className = 'ui raised red segment';
  } else { TASK.className = 'ui raised segment'; }
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
  DATE.innerText = t.date.toLocaleDateString();
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
  if (!subtask) {
    const ADDSUB_B = document.createElement('BUTTON');
    ADDSUB_B.className = 'ui button';
    ADDSUB_B.id = `addsubtask${tempnum}`;
    ADDSUB_B.innerText = 'Add Subtask';
    ADDSUB_B.addEventListener('click', addSubTask.bind(this, t));
    TASK.appendChild(ADDSUB_B);
  }
  return TASK;
}

// function to reset task editor functionality and look
function clearInput() {
  name.value = '';
  date.value = '';
  priority.value = '';
  desc.value = '';
  document.getElementById('task_editor_title').innerText = 'Inputs for a new task';
  curtask = -1;
  addtaskB.innerText = 'Add Task';
  addingsubtask = false;
  editsubtask = false;
}

// if not editing a task add a new task
// cases are addsubtask/editsubtask/edittask/addtask
function addTask() {
  if (addingsubtask) {
    maintodolist.addtask(name.value, date.value, priority.value, desc.value, curtask);
  } else if (editsubtask && curtask !== -1) {
    maintodolist.edittask(curtask, name.value, date.value, priority.value, desc.value, true);
  } else if (curtask !== -1) {
    maintodolist.edittask(curtask, name.value, date.value, priority.value, desc.value);
  } else {
    maintodolist.addtask(name.value, date.value, priority.value, desc.value);
  }
  displayTasks();
  clearInput();
}

// changes task editor title and current task
function addSubTask(task) {
  curtask = maintodolist.tasks.indexOf(task);
  addingsubtask = true;
  document.getElementById('task_editor_title').innerText = `Adding subtask to ${task.name}`;
  addtaskB.innerText = 'Add Subtask';
}
function Load() {

}
function Save() {

}
function resetPoints() {

}
function resetStreak() {

}
function changeUiColor() {
  const setting = document.getElementById('background_setting').value;
  document.body.style.backgroundColor = setting;
}
function changeFont() {

}
function changeFontColor() {

}
function displayHomePageTasks() {
  homepagetaskdisplay.innerHTML = '';
  let tempnum = 0;

  for (let i = 0; i <= Math.min(5, maintodolist.tasks.length - 1); i++) {
    const t = maintodolist.tasks[i];
    const TASK = createTaskHTML(t, tempnum, false);
    tempnum++;
    for (const s of t.subtasks) {
      const SUB = createTaskHTML(s, tempnum, true);
      TASK.appendChild(SUB);
      tempnum++;
    }
    homepagetaskdisplay.appendChild(TASK);
  }
}
function changeUsername() {
  maintodolist.changeUsername(document.getElementById('username_input').value);
  document.getElementById('username_input').value = '';
}

function editTask(task) {
  if (task.parenttask !== undefined) {
    curtask = maintodolist.subtasks.indexOf(task);
    editsubtask = true;
  } else { curtask = maintodolist.tasks.indexOf(task); }

  name.value = task.name;
  date.value = task.date.toLocaleDateString('en-CA');
  priority.value = task.priority;
  desc.value = task.desc;
  document.getElementById('task_editor_title').innerText = `editing task ${task.name}`;
  addtaskB.innerText = `reconfigure ${task.name}`;
}

// if a task is selected set the task to either a subtask or task and delete it
function deleteTask() {
  if (curtask !== -1) {
    let task;
    if (editsubtask) {
      task = maintodolist.subtasks[curtask];
    } else {
      task = maintodolist.tasks[curtask];
    }
    maintodolist.removetask(task);
    curtask = -1;
  }
  displayTasks();
}

// gets passed a button html object and uses the inner text to determine the sort type
function sortTasks(button) {
  switch (button.innerHTML) {
    case 'A-Z':
      maintodolist.sortAZ();
      break;
    case 'Z-A':
      maintodolist.sortZA();
      break;
    case '1-100':
      maintodolist.sort01();
      break;
    case '100-1':
      maintodolist.sort10();
      break;
    case '1/11/1111':
      maintodolist.sortDate();
      break;
    default:
      console.log('THIS SHOULDNT PRINT, YOUR SORT BUTTON EVENTS ARE MESSED UP');
  }
  displayTasks();
}

// complete task functionality handled by List class
function completeTask(task) {
  maintodolist.compeltetask(task);
  displayTasks();
}

// helper function since JS doesnt recognize strings as ints in any easy way
function strToInt(s) {
  let sum = 0;
  for (let i = 0; i < s.length; i++) {
    sum += s.charCodeAt(i);
  }
  return sum;
}

// attach listeners
addtaskB.addEventListener('click', addTask);
deletetaskB.addEventListener('click', deleteTask);
clearinputB.addEventListener('click', clearInput);
applybgB.addEventListener('click', changeUiColor);
usernameB.addEventListener('click', changeUsername);
for (const T of sortBs) {
  T.addEventListener('click', sortTasks.bind(this, T));
}

// other setup
datedisplay.innerText = maintodolist.date.toLocaleDateString();
