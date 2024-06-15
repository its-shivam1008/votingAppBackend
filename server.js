require('dotenv').config()
const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const userRoute = require('./Routes/userRoute');

app.use(bodyParser.json());

app.use('/user', userRoute);

app.get('/hello', (req,res) =>{
    res.send('Hello World!');
})

app.listen(process.env.PORT, () => {
    console.log('App is live at port:',process.env.PORT);
})
