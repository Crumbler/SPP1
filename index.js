const express = require('express');
const fs = require('fs');
const app = express();
const port = 80;

app.set('view engine', 'ejs');

app.use('/css', express.static('css'));

app.get('/', (req, res) => {
  const rawTasks = fs.readFileSync('tasks.json');
  let tasks = JSON.parse(rawTasks);

  if (req.query.filter && req.query.filter !== 'None')
  {
    tasks = tasks.filter(task => task.status === req.query.filter);
  }

  res.render('index.ejs', { 
      tasks: tasks,
      filter: req.query.filter ?? "None"
  } );
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});