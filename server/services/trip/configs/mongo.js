const { MongoClient } = require('mongodb');
const url = process.env.DB_URL || 'mongodb://localhost:27017';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

const connect = async () => await client.connect()
connect()

const db = client.db(process.env.DATABASE_NAME);

module.exports = db;