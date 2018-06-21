// const app = require('express')() merges lines 2 & 5
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const uuidv1 = require('uuid/v1')
const Student = require('./db')


const app = express()

// Parse application/json
app.use(bodyParser.json())
// CORS
app.use('/api/', cors())

// Return all students with GET
app.get('/api/students', async (req, res) => {
  res.json(await Student.find())
})

app.post('/api/students', async (req, res) => {
  const student = new Student({
    id: uuidv1(),
    name: req.body.studentname
  })
  await student.save()
  // students.push(student)
  res.json(student)
})

app.listen(3333, () => console.log('Listening on 3333'))
