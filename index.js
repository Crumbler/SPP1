const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { url } = require('inspector');
const app = express();
const port = 80;

const urlencodedParser = bodyParser.urlencoded({
  extended: false,
});

app.set('view engine', 'ejs');
app.use('/css', express.static('css'));


app.get('/', (req, res) => {
  const rawTasks = fs.readFileSync('tasks.json');
  let tasks = JSON.parse(rawTasks);
  const totalTasks = tasks.length;

  if (req.query.filter && req.query.filter !== 'None')
  {
    tasks = tasks.filter(task => task.status === req.query.filter);
  }

  res.render('index.ejs', { 
      tasks: tasks,
      totalTasks: totalTasks
  } );
});


app.post('/', urlencodedParser, (req, res) => {
  if (!req.body || !req.body.task) 
  {
    return response.sendStatus(400);
  }

  const rawTasks = fs.readFileSync('tasks.json');
  let tasks = JSON.parse(rawTasks);

  const taskId = req.body.task;

  if (req.body.date)
  {
    tasks[taskId - 1].completionDate = req.body.date;
  }
  else
  {
    tasks[taskId - 1].completionDate = null;
  }
  
  const writeData = JSON.stringify(tasks, null, 2);
  fs.writeFileSync('tasks.json', writeData);

  res.render('index.ejs', { 
      tasks: tasks,
      totalTasks: tasks.length
  } );
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});