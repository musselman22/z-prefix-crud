const express = require('express')
var cors = require('cors')
const path = require('path')
const PORT = process.env.PORT || 3001
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/tasks', (req, res) => {
  res.status(200).json([{ task: "mow lawn" }])
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use(function (req, res, next) {
  next(createError(404))
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))