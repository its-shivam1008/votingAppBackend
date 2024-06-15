const mongoose = require('mongoose');

mongoose.connect(process.env.mongoUrl);

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