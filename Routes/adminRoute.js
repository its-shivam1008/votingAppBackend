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
            res.status(404).json({message:"you are not permitted to access this route", success:false});
        }else{
            const data = req.body;
            const newCandidate = new Candidate(data);
            const response = await newCandidate.save();
            res.status(200).json({response, success:true, message:'Candidate is added'});
        }
    }catch(err){
        res.status(500).json({message:"Internal server error", success:false});
    }
});

router.get('/candidates', async(req,res) =>{
    try{
        if(!(await checkAdmin(req.user.id))){
            res.status(404).json({message:"you are not permitted to access this route", success:false});
        }else{
            const data = await Candidate.find();
            res.status(200).json({data, success:true, message:'Candidates are fetched'});
        }
    }catch(err){
        res.status(500).json({message:"Internal server error", success:false});
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
            if(field!='voteCount' && field!="votes"){
                const response = await Candidate.findByIdAndUpdate(candidateId, data, {
                    runValidators: true,
                    new:true
                });
                res.status(200).json({response, message:"Updated the candidate"});
            }else{
                res.status(404).json({error:"Cannot update fields related with votes"});
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