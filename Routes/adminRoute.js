const express = require('express');
const router = express.Router();
const Candidate = require('./../models/Candidate');
const User = require('./../models/User');

const checkAdmin = async (userId)=>{
    try{
        const response = await User.findById(userId);
        return response.userType === 'admin'? true: false;
    }catch(err){
        throw err;
    }
}

router.post('/candidate', async(req,res)=>{
    try{
        if(!(await checkAdmin(req.user.id))){
            res.status(404).json({error:"you are not permitted to access this route"});
        }else{
            const data = req.body;
            const newCandidate = new Candidate(data);
            const response = await newCandidate.save();
            res.status(200).json({response});
        }
    }catch(err){
        res.status(500).json({error:"Internal server error"});
    }
});

router.get('/candidates', async(req,res) =>{
    try{
        if(!(await checkAdmin(req.user.id))){
            res.status(404).json({error:"you are not permitted to access this route"});
        }else{
            const data = await Candidate.find();
            res.status(200).json(data);
        }
    }catch(err){
        res.status(500).json({error:"Internal server error"});
    }
});

router.put('/candidate/:field/:candidateId', async(req, res)=>{
    try{
        if(!(await checkAdmin(req.user.id))){
            res.status(404).json({error:"you are not permitted to access this route"});
        }else{
            const field = req.params.field;
            const candidateId = req.params.candidateId;
            const data = req.body;
            if(field=='name' || field=="age" || field=="party"){
                const response = await Candidate.findByIdAndUpdate(candidateId, data, {
                    runValidators: true,
                    new:true
                });
                res.status(200).json({response, message:"Updated "+field});
            }else{
                res.status(404).json({error:"Cannot update "+field});
            }
        }
    }catch(err){
        res.status(500).json({error:"Internal server error"});
    }
});

router.delete('/candidate/:candidateId', async(req, res)=>{
    try{
        if(!(await checkAdmin(req.user.id))){
            res.status(404).json({error:"you are not permitted to access this route"});
        }else{
            const candidateId = req.params.candidateId;
            const response = await Candidate.findByIdAndDelete(candidateId);
            res.status(200).json({message: "Candidate deleted"});
        }
    }catch(err){
        res.status(500).json({error:"Internal server error"});
    }
});

module.exports = router;