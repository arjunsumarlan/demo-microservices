const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url, { useUnifiedTopology: true })

module.exports = client