const mongoose = require('mongoose');

const mongoUrl = 'mongodb://localhost:27017/votingApp';

mongoose.connect(mongoUrl);

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log('Mongodb connection successful');
})
db.on('error', (err)=>{
    console.log('Unable to connect to Mongodb\n:',err);
})
db.on('disconnected', ()=>{
    console.log('Mongodb disconnected');
})

module.exports = db;