/* global  addTask, deleteTask, addSubTasks,  , resePoints, resetStreak, changeUiColor, changeFont,  */


describe("todolist tests", function (){
  let list = new List()
  describe("List class functions", function(){
    describe("addtask()", function (){
      it('should take name date pirority desc and task number and add a task to the list', function () {
        list.addtask("test task", new Date("01/12/2021"), 0, "this is a test")
        chai.expect(list.tasks[0].name).to.equal("test task")
        chai.expect(list.tasks[0].date).to.deep.equal(new Date("01/12/2021"))
        chai.expect(list.tasks[0].priority).to.equal(0)
        chai.expect(list.tasks[0].desc).to.equal("this is a test")

      });
    })

  })

})