const express = require('express')
const axios = require('axios')
const app = express()
const Redis = require('ioredis')
const redis = new Redis()

app.use(express.json())

app.get('/students', async (req, res) => {
  // Pointing ke student service
  try {
    // Check ke redis ada ga data students
    const data = await redis.get('students')
    console.log(data)
    if (data) {
      // Kalau ada, ambil data dari redis
      console.log('disini terjadi')
      res.send(JSON.parse(data))
    } else {
      // Kalau ga ada, ambil ke database melalui axios
      console.log('disana terjadi')
      const { data } = await axios.get('http://localhost:3001')
      redis.set('students', JSON.stringify(data))
      res.send(data)
    }
  } catch (err) {
    res.send(err)
  }
})

app.post('/students', async (req, res) => {
  try {
    const { data } = await axios.post('http://localhost:3001', req.body)
    await redis.del('students')
    res.send(data)
  } catch (err) {
    res.send(err)
  }
})

app.get('/instructors', async (req, res) => {
  // Pointing ke instructor service
  try {
    // Check ke redis ada ga data instructor
    const data = await redis.get('instructors')
    console.log(data)
    if (data) {
      // Kalau ada, ambil data dari redis
      console.log('disini terjadi')
      res.send(JSON.parse(data))
    } else {
      // Kalau ga ada, ambil ke database melalui axios
      console.log('disana terjadi')
      const { data } = await axios.get('http://localhost:3001')
      redis.set('instructors', JSON.stringify(data))
      res.send(data)
    }
  } catch (err) {
    res.send(err)
  }
})

app.post('/instructors', async (req, res) => {
  try {
    const { data } = await axios.post('http://localhost:3001', req.body)
    await redis.del('instructors')
    res.send(data)
  } catch (err) {
    res.send(err)
  }
})

app.get('/redis', async (req, res) => {
  await redis.set('batch', 'loyal-fox', 'EX', 10)
  // const data = await redis.get('batch')

  res.send('berhasil gan')
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
