const express = require('express')
const axios = require('axios')
const app = express()
const Redis = require('ioredis')
const redis = new Redis()

app.use(express.json())



app.get('/students', async (req, res) => {
  try {

    const data = await redis.get('students')

    if (data) {
      res.send(JSON.parse(data))
    } else {
      const { data } = await axios.get('http://localhost:3001')
      await redis.set('students', JSON.stringify(data))
      res.send(data)
    }

  } catch (err) {
    res.send(err)
  }
})

app.post('/students', async (req, res) => {
  try {

    const { data } = await axios.post('http://localhost:3001', req.body)
    const dataAll = await redis.get('students')
    if (dataAll) {
      await redis.set('students', JSON.stringify(JSON.parse(dataAll).concat(data.ops[0])))
    }
    // else {
    //   await redis.set('students', JSON.stringify([...data.ops[0]]))
    // }

    res.send(data)

  } catch (err) {
    res.send(err)
  }
})


app.get('/instructors', async (req, res) => {
  try {

    const data = await redis.get('instructors')

    if (data) {
      res.send(JSON.parse(data))
    } else {
      const { data } = await axios.get('http://localhost:3002')
      await redis.set('instructors', JSON.stringify(data))
      res.send(data)
    }

  } catch (err) {
    res.send(err)
  }
})

app.post('/instructors', async (req, res) => {
  try {

    const { data } = await axios.post('http://localhost:3002', req.body)
    const dataAll = await redis.get('instructors')
    if (dataAll) {
      await redis.set('instructors', JSON.stringify(JSON.parse(dataAll).concat(data.ops[0])))
    }
    // else {
    //   await redis.set('instructors', JSON.stringify([...data.ops[0]]))
    // }

    res.send(data)

  } catch (err) {
    res.send(err)
  }
})



app.get('/redis', async (req, res) => {
  await redis.set('batch', 'native-fox', 'EX', 10);

  res.send('berhasil cuyyy')
})


app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
