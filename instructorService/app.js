const express = require('express')
const app = express()
const client = require('./services/mongo')

function initializeMongo(req, res, next) {
  client.connect()
    .then(() => {
      const db = client.db('native-fox')
      req.db = db
      next()
    })
    .catch(err => {
      res.send(err)
    })
}

app.use(initializeMongo)

app.use(express.json())

app.get('/', async (req, res) => {
  try {
    const db = req.db
    const students = await db.collection('instructors').find({}).toArray()
    res.send(students)
  } catch (err) {
    res.send(err)
  }

  // return db.collection('students').find({}).toArray()
  // .then(students => {
  //   res.send(students)
  // })
  // .catch(err => {
  //   res.send(err)
  // })
});

app.post('/', async (req, res) => {
  const data = await req.db.collection('instructors').insertOne(req.body)

  res.send(data)
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});