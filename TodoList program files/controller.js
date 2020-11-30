class Task {
  constructor(name, date, priority, desc, parenttask) {
    this.name = name;
    this.desc = desc;
    this.date = date;
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
    this.tasks = [];
    this.subtasks = [];
    this.points = 0;
    this.streak = 0;
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
    if (task.parenttask === undefined) {
      this.tasks.splice(this.tasks.indexOf(task), 1);
    } else {
      task.parenttask.removesubtask(task);
      this.subtasks.splice(this.subtasks.indexOf(task), 1);
    }
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
let addingsubtask = false;
let editsubtask = false;

// define controller functions

// might want to give make a single task display function
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
}

function createTaskHTML(t, tempnum, subtask) {
  const TASK = document.createElement('DIV');
  if (subtask) {
    TASK.className = 'ui secondary segment';
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
function Load(){

}
function Save(){

}
function resetPoints(){

}
function resetStreak(){

}
function changeUiColor(){

}
function changeFont(){

}
function changeFontColor(){

}


function editTask(task) {
  if (task.parenttask !== undefined) {
    curtask = maintodolist.subtasks.indexOf(task);
    editsubtask = true;
  } else { curtask = maintodolist.tasks.indexOf(task); }

  name.value = task.name;
  date.value = task.date;
  priority.value = task.priority;
  desc.value = task.desc;
  document.getElementById('task_editor_title').innerText = `editing task ${task.name}`;
  addtaskB.innerText = `reconfigure ${task.name}`;
}

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

function completeTask(task) {
  maintodolist.compeltetask(task);
  displayTasks();
}

// attach listeners
addtaskB.addEventListener('click', addTask);
deletetaskB.addEventListener('click', deleteTask);
clearinputB.addEventListener('click', clearInput);
