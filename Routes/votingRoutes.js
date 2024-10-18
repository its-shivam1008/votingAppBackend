const express = require('express');
const router = express.Router();
const User = require("./../models/User");
const Candidate = require('./../models/Candidate');
const { jwtAuthMiddleware } = require('../jwt');

const isVoter = async (userId) =>{
    const user = await User.findById(userId);
    return user.userType === 'voter'? true : false;
}
router.put('/:candidateId', jwtAuthMiddleware, async(req,res) =>{
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
                userVote.votedFor.party = candidate.party;
                userVote.votedFor.votedAt = new Date().toISOString();
                await userVote.save();
                const response = await candidate.save();
                res.status(200).json({message:'Voted sucessfully for '+response.name, success:true});
            }else{
                res.status(404).json({message:"Already voted, you can only vote once", success:false});
            }
        }else{
            res.status(404).json({message:"You cannot vote, Admin's account", success:false});
        }
    }catch(err){
        res.status(500).json({message:"Internal server error", success:false});
    }
});

router.get('/count', async(req, res) =>{
    try{
        const candidate = await Candidate.find().sort({voteCount: "desc"});

        const record = candidate.reduce((acc, data) => {
            acc[data.party] = (acc[data.party] || 0) + data.voteCount;
            return acc;
          }, {});
        res.status(200).json({ message:'Got the counts', success:true , record});
    }catch(err){
        res.status(500).json({message:"Internal server error", success:false});
    }
})
module.exports = router;