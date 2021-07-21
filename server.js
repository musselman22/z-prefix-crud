const express = require('express')
var cors = require('cors')
const path = require('path')
const PORT = process.env.PORT || 3001
const app = express()

// if you are running locally, uncomment the line below
// const knex = require('knex')(require('./knexfile.js')['development']);
// if you are running in deployed enviroment, uncomment the line below
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV]);

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'client/build')));

// Read 
app.get('/api/tasks', function (req, res) {
  knex.select().table('tasks').orderBy('task_id')
    .then(response => res.status(200).json(response))
    .catch(err => res.status(404).send("There was an error"))
});

// Create
app.post('/api/tasks', (req, res) => {
  knex('tasks').insert(req.body)
    .then(response => {
      console.log(response)
      res.status(200).send("added task")
    })
    .catch(err => {
      console.log(err)
      res.status(404).send("There was an error")
    })

});

// Update
app.put('/api/tasks', (req, res) => {
  knex('tasks')
    .where('task_id', '=', req.body.task_id)
    .update(req.body)
    .then(response => {
      res.status(200).send("updated task")
    })
    .catch(err => {
      console.log(err)
      res.status(404).send("There was an error")
    })
});


// Delete
app.delete('/api/tasks', (req, res) => {
  if (req.body.task_id) {
    knex('tasks')
      .where('task_id', '=', req.body.task_id)
      .del()
      .then(() => res.status(200).send("task deleted"))
      .catch(err => res.status(404).send("There was error, maybe the task_id was invalid"))
  } else {
    res.status(400).send("must have a task_id")
  }
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use(function (req, res, next) {
  next(createError(404))
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))