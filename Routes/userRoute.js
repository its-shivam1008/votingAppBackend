const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {jwtAuthMiddleware, generateToken} = require('./../jwt')

router.post('/signup', async(req, res)=>{
    try{
        const data = req.body;
        const newPerson = new User(data);
        const response = await newPerson.save();

        const payload = {
            id : response.id,
            adhaarNum : response.adhaarNum,
            name: response.name
        }
        const token = generateToken(payload);
        res.status(200).json({response,token});
    }catch(err){
        res.status(500).json({error: "Internal server error"})
    }
})

module.exports = router;