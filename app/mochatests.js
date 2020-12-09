/* global  addTask, deleteTask, addSubTasks,  , resePoints, resetStreak, changeUiColor, changeFont,  */


describe("todolist tests", function (){

  describe("List class functions", function(){
    describe("addtask()", function (){
      it('should take name date pirority desc and task number and add a task to the list', function () {
        let list = new List()
        list.addtask("test task", new Date("01/12/2021"), 0, "this is a test")
        chai.expect(list.tasks[0].name).to.equal("test task")
        chai.expect(list.tasks[0].date).to.deep.equal(new Date("01/12/2021"))
        chai.expect(list.tasks[0].priority).to.equal(0)
        chai.expect(list.tasks[0].desc).to.equal("this is a test")

      });
      it('should beable to add multiple tasks and are in the order they were put in ', function () {
        let list = new List()
        list.addtask("first task", new Date(), 0 , "this is the first task")
        list.addtask("second task", new Date(), 1, "this is the second task")
        list.addtask("third task", newDate(), 0, "this is the third task")
        chai.expect(list.tasks[1].name).to.equal("test task")
        chai.expect(list.tasks[1].date).to.deep.equal(new Date("01/12/2021"))
        chai.expect(list.tasks[1].priority).to.equal(0)
        chai.expect(list.tasks[1].desc).to.equal("this is a test")
        
      });
      it('should be able to add subtasks to tasks', function () {
        let list = new List()
        
      });
      it('should be able to add many subtasks to tasks', function () {
        let list = new List()
        
      });
    });
    describe("edittask()",function (){
      it('should be able to edit a given task given an index for the task', function () {
        let list = new List()
        
      });
      it('should be able to edit subtask', function () {
        let list = new List()
        
      });

    })
    describe("compltetask()",function (){
      it('should be able to complete tasks as well as update streak and points', function () {
        let list = new List()
        
      });
      it('should be able to reset streak if a task is overdue', function () {
        let list = new List()
        
      });
      it('should be able to add more points if a streak is going ', function () {
        let list = new List()
        
      });
    })
    describe("removeTask()",function (){
      it('should be able to remove tasks', function () {
        let list = new List()
        
      });
      it('should be able to reamove a subtask', function () {
        let list = new List()
        
      });

    })

    describe("changeUsername()", function (){
      it('should be able to change the username', function () {
        let list = new List()
        
      });

    });
    describe("resetStreak()", function (){
      it('should be able to reset the current streak', function () {
        let list = new List()
        
      });

    })
    describe("resetPoints()",function(){
      it('should be able to reset the current points to zero', function () {
        let list = new List()
        
      });

    })
    describe("sortAZ()",function (){
      it('should be able to sort the current list of tasks by alphabetal order', function () {
        let list = new List()
        
      });

    })
    describe("sortZA()",function (){
      it('should be able to sort the current list of tasks by reverse alphabetical order', function () {
        let list = new List()
        
      });

    })
    describe("sort01()",function (){
      it('should be able to sort the current list of tasks by priority lowest first', function () {
        let list = new List()
        
      });

    })
    describe("sort10()",function (){
      it('should be able to sort the current list of tasks by priority highest first', function () {
        let list = new List()
        
      });
    })
    describe("sortDate()",function (){
      it('should beable to sort the current list of tasks by date earliest first', function () {
        
      });

    })







  });

});