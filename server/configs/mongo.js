const { MongoClient } = require('mongodb');
const url = process.env.DB_URL || 'mongodb://localhost:27017';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

function connect(callback) {
    client.connect(function(err) {
        if(err) {
            console.log('err connection to mongodb', err);
        } else {
            console.log('connected to mongodb');
            db = client.db(process.env.DATABASE_NAME);
        }
        callback(err);
    });
};
function getDatabase() {
    return db;
};

module.exports = { connect, getDatabase };