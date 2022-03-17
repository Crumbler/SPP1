const express = require('express');
const fs = require('fs');
const app = express();
const port = 80;

app.set('view engine', 'ejs');

app.use('/css', express.static('css'));

app.get('/', (req, res) => {

  let tagLine = req.query.tagLine;

  if (!req.query.tagLine)
  {
      tagLine = 'no tag supplied';
  }

  res.render('index.ejs', { 
      tagLine: tagLine
  } );
});

app.get('/test/', (req, res) => {
    let rawdata = fs.readFileSync('tasks.json');
    let student = JSON.parse(rawdata);

    res.json(student);

    /*if (req.query.something)
    {
        res.send(req.query.something);
    }
    else
    {
        res.send('nothing sent');
    }*/
  });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});