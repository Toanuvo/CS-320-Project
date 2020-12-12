/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* global Task, List, addTask, deleteTask, addSubTasks,  , resePoints, resetStreak, changeUiColor, changeFont,  */

// helper function for single task adding
function adtsk(lst) {
  lst.addtask('test task', new Date('01/01/2020'), 0, 'this is a test');
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate random number
    const j = Math.floor(Math.random() * (i + 1));

    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

describe('todolist tests', function () {
  describe('List class functions', function () {
    describe('addtask()', function () {
      it('should add a task object to the task list that has the correct properties and values', function () {
        const list = new List();
        list.addtask('test task', new Date('01/12/2021'), 0, 'this is a test');
        chai.expect(list.tasks[0]).to.be.an.instanceOf(Task);
        chai.expect(list.tasks[0]).has.property('name').that.equal('test task');
        chai.expect(list.tasks[0]).has.property('date').that.deep.equal(new Date('01/12/2021'));
        chai.expect(list.tasks[0]).has.property('priority').that.equal(0);
        chai.expect(list.tasks[0]).has.property('desc').that.equal('this is a test');
      });
      it('should be able to add many tasks and are in the order they were put in ', function () {
        const list = new List();
        for (let i = 0; i <= 1000; i++) {
          list.addtask(`task ${i}`, new Date('01/12/2021'), i, `this is task${i}`);
        }
        for (let i = 0; i <= 1000; i++) {
          const tsk1 = list.tasks[i];
          chai.expect(tsk1.name).to.equal(`task ${i}`);
          chai.expect(tsk1.date).to.deep.equal(new Date('01/12/2021'));
          chai.expect(tsk1.priority).to.equal(i);
          chai.expect(tsk1.desc).to.equal(`this is task${i}`);
        }
      });
      it('should be able to add subtasks to tasks', function () {
        // should test same stuff as add task but for the subtask and its new properties
        const list = new List();
        list.addtask('test task', new Date('01/12/2021'), 0, 'this is a task');
        list.addtask('test subtask', new Date('01/12/2021'), 0, 'this is a new task', 0);
        const tsk1 = list.tasks[0];
        const stsk1 = tsk1.subtasks[0];
        chai.expect(tsk1.name).to.equal('test task');
        chai.expect(tsk1.date).to.deep.equal(new Date('01/12/2021'));
        chai.expect(tsk1.priority).to.equal(0);
        chai.expect(tsk1.desc).to.equal('this is a task');
        chai.expect(stsk1.name).to.equal('test subtask');
        chai.expect(stsk1.date).to.deep.equal(new Date('01/12/2021'));
        chai.expect(stsk1.priority).to.equal(0);
        chai.expect(stsk1.desc).to.equal('this is a new task');
      });

      it('should be able to add many subtasks to tasks', function () {
        const list = new List();
        list.addtask('test task', new Date('01/12/2021'), 0, 'this is a task');
        list.addtask('test 1subtask', new Date('01/13/2021'), 0, 'this is a new 1task', 0);
        list.addtask('test 2subtask', new Date('01/13/2021'), 1, 'this is a new 2task', 0);
        list.addtask('test 3subtask', new Date('01/13/2021'), 0, 'this is a new 3task', 0);
        const tsk1 = list.tasks[0];
        const stsk1 = tsk1.subtasks[1];
        chai.expect(stsk1.name).to.equal('test 2subtask');
        chai.expect(stsk1.date).to.deep.equal(new Date('01/13/2021'));
        chai.expect(stsk1.priority).to.equal(1);
        chai.expect(stsk1.desc).to.equal('this is a new 2task');
      });
    });
    describe('edittask()', function () {
      it('should be able to edit a given task given an index for the task', function () {
        const list = new List();
        list.addtask('test task', new Date('01/12/2021'), 0, 'this is a task');
        list.edittask(0, 'test edittask', new Date('01/13/2021'), 1, 'this is a reetask');
        const tsk1 = list.tasks[0];
        chai.expect(tsk1.name).to.equal('test edittask');
        chai.expect(tsk1.date).to.deep.equal(new Date('01/13/2021'));
        chai.expect(tsk1.priority).to.equal(1);
        chai.expect(tsk1.desc).to.equal('this is a reetask');
      });
      it('should be able to edit subtask', function () {
        const list = new List();
        list.addtask('test task', new Date('01/12/2021'), 0, 'this is a task');
        list.addtask('test subtask', new Date('01/13/2021'), 0, 'this is a subtask', 0);
        list.edittask(0, 'test reee', new Date('01/14/2021'), 1, 'this is editited', true);
        const subtask = list.tasks[0].subtasks[0];
        chai.expect(subtask.name).to.equal('test reee');
        chai.expect(subtask.date).to.deep.equal(new Date('01/14/2021'));
        chai.expect(subtask.priority).to.equal(1);
        chai.expect(subtask.desc).to.equal('this is editited');
      });
    });

    describe('compltetask()', function () { //
      it('should be able to complete tasks as well as update streak and points', function () {
        const list = new List();
        list.addtask('test task', new Date(), 0, 'this is a test');
        list.completetask(list.tasks[0]);
        chai.expect(list.points).to.equal(1);
        chai.expect(list.streak).to.equal(1);
      });
      it('should be able to reset streak if a task is overdue and not add points', function () {
        const list = new List();
        adtsk(list);
        list.completetask(list.tasks[0]);
        chai.expect(list.points).to.equal(0);
        chai.expect(list.streak).to.equal(0);
      });
      it('should be able to add more points if a streak is going ', function () {
        const list = new List();
        list.addtask('test task1', new Date(), 0, 'this is a test');
        list.addtask('test task2', new Date(), 0, 'this is a test');
        list.addtask('test task3', new Date(), 0, 'this is a test');
        list.completetask(list.tasks[0]);
        list.completetask(list.tasks[0]);
        list.completetask(list.tasks[0]);
        chai.expect(list.points).to.equal(6);
        chai.expect(list.streak).to.equal(3);
      });
      it('should be able to reset streak if a task is overdue and not modify the current points', function () {
        const list = new List();
        list.addtask('test task1', new Date(), 0, 'this is a test');
        adtsk(list);
        list.completetask(list.tasks[0]);
        list.completetask(list.tasks[0]);
        chai.expect(list.points).to.equal(1);
        chai.expect(list.streak).to.equal(0);
      });
    });
    describe('removeTask()', function () { //
      it('should be able to remove tasks', function () {
        const list = new List();
        adtsk(list);
        list.removetask(list.tasks[0]);
        chai.expect(list.tasks).to.be.an('array').that.is.empty;
        chai.expect(list.points).to.equal(0);
        chai.expect(list.streak).to.equal(0);
      });
      it('should be able to remove a subtask', function () {
        const list = new List();
        adtsk(list);
        list.addtask('subtask1', new Date(), 0, 'this is a subtask', 0);
        const tsk = list.tasks[0];
        const sbtsk = list.subtasks[0];
        list.removetask(sbtsk);
        chai.expect(list.subtasks).to.be.an('array').that.is.empty;
        chai.expect(tsk.subtasks).to.be.an('array').that.is.empty;
      });
    });

    describe('changeUsername()', function () {
      it('should be able to change the username', function () {
        const list = new List();
        list.changeUsername('Riley');
        chai.expect(list.username).to.be.a('string').that.equal('Riley');
      });
    });
    describe('resetStreak()', function () {
      it('should be able to reset the current streak', function () {
        const list = new List();
        list.addtask('test task', new Date(), 0, 'this is a test');
        list.completetask(list.tasks[0]);
        chai.expect(list.streak).to.equal(1);
        list.resetStreak();
        chai.expect(list.streak).to.equal(0);
      });
    });

    describe('resetPoints()', function () {
      it('should be able to reset the current points to zero', function () {
        const list = new List();
        list.addtask('test task', new Date(), 0, 'this is a test');
        list.completetask(list.tasks[0]);
        chai.expect(list.points).to.equal(1);
        list.resetPoints();
        chai.expect(list.points).to.equal(0);
      });
    });
    describe('sortAZ()', function () {
      it('should be able to sort the current list of tasks by lexographic order', function () {
        const list = new List();
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        const randalph = shuffleArray(alphabet.slice());
        for (const a of randalph) {
          list.addtask(a, new Date(), 0, 'this is a test');
        }
        list.sortAZ();
        for (const a of alphabet) {
          chai.expect(list.tasks[alphabet.indexOf(a)].name).to.be.equal(a);
        }
      });
    });
    describe('sortZA()', function () { //
      it('should be able to sort the current list of tasks by reverse lexographic order', function () {
        const list = new List();
        const reverseA = 'abcdefghijklmnopqrstuvwxyz'.split('').reverse();
        const randalph = shuffleArray(reverseA.slice());
        for (const a of randalph) {
          list.addtask(a, new Date(), 0, 'this is a test');
        }
        list.sortZA();
        for (const a of reverseA) {
          chai.expect(list.tasks[reverseA.indexOf(a)].name).to.be.equal(a);
        }
      });
    });
    describe('sort01()', function () {
      it('should be able to sort the current list of tasks by priority lowest first', function () {
        const list = new List();
        const ints = new Array(100);
        for (let i = 0; i < 100; i++) {
          ints[i] = i;
        }
        const randints = shuffleArray(ints.slice());
        for (const i of randints) {
          list.addtask(String(i), new Date(), i, 'this is a test');
        }
        list.sort01();
        for (const i of ints) {
          chai.expect(list.tasks[i].priority).to.be.equal(i);
        }
      });
    });
    describe('sort10()', function () { //
      it('should be able to sort the current list of tasks by priority highest first', function () {
        const list = new List();
        const ints = new Array(100);
        for (let i = 100; i >= 0; i--) {
          ints[100 - i] = i;
        }

        const randints = shuffleArray(ints.slice());
        for (const i of randints) {
          list.addtask(String(i), new Date(), i, 'this is a test');
        }
        list.sort10();

        for (const i of ints) {
          chai.expect(list.tasks[100 - i].priority).to.be.equal(i);
        }
      });
    });
    // TODO needs to be done
    describe('sortDate()', function () {
      it('should be able to sort the current list of tasks by date earliest first', function () {
        const dates = [new Date('12/11/2020'), new Date('12/12/2020'), new Date('12/13/2020'), new Date('12/14/2020'), new Date('12/15/2020'), new Date('12/16/2020'), new Date('12/17/2020')];

        const list = new List();
        const randdates = shuffleArray(dates.slice());
        for (let i = 0; i < 7; i++) {
          list.addtask('test', randdates[i], i, 'this is a test');
        }
        list.sortDate();
        for (let i = 0; i < 7; i++) {
          chai.expect(list.tasks[i].date).to.deep.equal(dates[i]);
        }
      });
    });
  });
});
