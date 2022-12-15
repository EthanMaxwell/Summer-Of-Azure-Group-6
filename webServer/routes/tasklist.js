const TaskDao = require("../models/taskDao");

 class TaskList {
   /**
    * Handles the various APIs for displaying and managing tasks
    * @param {TaskDao} taskDao
    */
   constructor(taskDao) {
     this.taskDao = taskDao;
   }
   async showTasks(req, res) {
     const querySpec = {
       query: "SELECT * FROM root",
     };

     const item = await this.taskDao.find(querySpec);
     res.render("index", {
       title: "Feedback ",
       feedback: item
     });
   }

   async addTask(req, res) {
     const item = req.body;

     await this.taskDao.addItem(item);
     res.redirect("/");
   }
 }

 module.exports = TaskList;