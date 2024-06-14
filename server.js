const express = require('express');
const app = express();
const db = require('./db');

const PORT = 8080;

app.get('/hello', (req,res) =>{
    res.send('Hello World!');
})

app.listen(PORT, () => {
    console.log('App is live at port:',PORT);
})
