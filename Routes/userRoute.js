const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Candidate = require('../models/Candidate');
const {jwtAuthMiddleware, generateToken} = require('./../jwt')

const adminInDb =async (data) =>{
    try{
        if(data.userType=='admin'){
            const findAdmin = await User.findOne({userType:'admin'});
            return findAdmin == null ? false:true;
        }else{
            return false;
        }
    }catch(err){
        throw err;
    }
}

router.post('/signup', async(req, res)=>{
    try{
        const data = req.body;
        if((await adminInDb(data))){
            res.status(403).json({error: "admin is alreaady present."})
        }else{
            const newPerson = new User(data);
            const response = await newPerson.save();
    
            const payload = {
                id : response.id,
                name: response.name
            }
            const token = generateToken(payload);
            res.status(200).json({response,token});
        }
    }catch(err){
        res.status(500).json({error: "Internal server error"})
    }
});

router.post('/login', async(req,res) =>{
    try{
        const {adhaarNum, password} = req.body;
        const user = await User.findOne({adhaarNum:adhaarNum});
        if(!user || !(await user.comparePassword(password))){
            res.status(401).json({error:"Incorrect Adhaar number or password"});
        }else{
            const payload = {
                id : user.id,
                name: user.name
            }
            const token = generateToken(payload);
            res.status(200).json({token});
        }
    }catch(err){
        res.status(500).json({error: "Internal server error"})
    }
});

router.get('/profile', jwtAuthMiddleware, async(req,res) =>{
    try{
        const userData = req.user;
        const userId = userData.id;
        const user = await User.findById(userId);
        res.status(200).json({user});
    }catch(err){
        res.status(500).json({error:"Internal server error"});
    }
});

router.put('/profile/:field', jwtAuthMiddleware, async(req,res)=>{
    try{
        const field = req.params.field;
        const data = req.body;
        const userId = req.user.id;
        if(field=='address' || field=="contactNum" || field=="password"){

            if(field=="password"){

                const {currentPass, newPass} = req.body;

                const user = await User.findById(userId);

                if(!user || !(await user.comparePassword(currentPass))){
                    res.status(401).json({error:"Incorrect password"});
                }else{
                    user.password = newPass;
                    const response = await user.save();
    
                    res.status(200).json({response,mssg:"Updated "+field});
                }
            }else{
                const response = await User.findByIdAndUpdate(userId, data, {
                runValidators: true,
                new:true
                });

                res.status(200).json({response,mssg:"Updated "+field});
            }
        }else{
            res.status(403).json({response,mssg:"You are not allowed to update"+field});
        }
    }catch(err){
        res.status(500).json({error:"Internal server error"});
    }
});

router.get('/candidates', async(req,res) =>{
    try{
        const data = await Candidate.find();
        res.status(200).json(data);
    }catch(err){
        res.status(500).json({error:"Internal server error"});
    }
});

module.exports = router;