const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/signup', async(req, res)=>{
    try{
        const data = req.body;
        const newPerson = new User(data);
        const response = await newPerson.save();
        res.status(200).json(response);
    }catch(err){
        res.status(500).json({error: "Internal server error"})
    }
})

module.exports = router;