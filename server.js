const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const tasksController = require('./components/tasks/tasks_controller');

const mongooseUri = 'mongodb://localhost:27017/todo_list';
const listenPort = 3000;

// Connect to Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(mongooseUri, function(err, res) {
  if (err) {
    console.info('ERROR connecting to: ' + mongooseUri + '. ' + err);
  } else {
    console.info('Succeeded connected to: ' + mongooseUri);
    mongoose.set('useFindAndModify', false);
  }
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '5mb'}));

// app.use('/api',async function (req, res, next) {
//   // เก็บ Request Log 
//   console.debug({'host': req.hostname,'url': req.originalUrl,'method': req.method,'headers': req.headers,'request': req.body,'created_date': new Date()});
//   next();
// });


app.route('/api/tasks')
  .get(tasksController.getAllTasks)
  .post(tasksController.createTask);

app.route('/api/tasks/:id')
  .get(tasksController.getTask)
  .patch(tasksController.editTask) // edit task, set task status
  .delete(tasksController.deleteTask);


app.listen(listenPort, function() {
  console.log('Server started on port '+ listenPort);
});
