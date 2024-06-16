const express = require('express');
const router = express.Router();
const User = require("./../models/User");
const Candidate = require('./../models/Candidate');

const isVoter = async (userId) =>{
    const user = await User.findById(userId);
    return user.userType === 'voter'? true : false;
}
router.put('/:candidateId', async(req,res) =>{
    try{
        if(await isVoter(req.user.id)){

            const candidateId = req.params.candidateId;
            const userVote = await User.findById(req.user.id)
            if(!(userVote.isVoted)){
                const candidate = await Candidate.findById(candidateId);
                candidate.votes.push({
                    user: req.user.id
                });
    
                candidate.voteCount = candidate.voteCount+1;
                userVote.isVoted = true;
                await userVote.save();
                const response = await candidate.save();
                res.status(200).json({response});
            }else{
                res.status(404).json({message:"Already voted, you can only vote once"});
            }
        }else{
            res.status(404).json({error:"You cannot vote, Admin's account"});
        }
    }catch(err){
        res.status(500).json({error:"Internal server error"});
    }
});

router.get('/count', async(req, res) =>{
    try{
        const candidate = await Candidate.find().sort({voteCount: "desc"});

        const record = candidate.map((data) =>{
            return {
                name: data.name,
                party: data.party,
                count: data.voteCount
            }
        })
        res.status(200).json({record});
    }catch(err){
        res.status(500).json({error:"Internal server error"});
    }
})
module.exports = router;