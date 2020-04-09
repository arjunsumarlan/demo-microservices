const express = require('express')
const app = express()
const client = require('./services/mongo')

function initializeMongo(req, res, next) {
  client.connect()
    .then(() => {
      const db = client.db('native-fox');
      req.db = db;
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
    const students = await db.collection('students').find().toArray()
    res.send(students)

  } catch (err) {
    res.send(err)
  }
})

app.post('/', async (req, res) => {
  try {

    const db = req.db
    const data = await db.collection('students').insertOne(req.body)
    res.send(data)

  } catch (err) {
    res.send(err)
  }

})

app.listen(3001, () => {
  console.log('App listening on port 3001!');
});