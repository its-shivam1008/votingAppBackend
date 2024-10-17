const mongoose = require('mongoose');

const newCandidate = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    profilePic:{
        type:String,
        required:true
    },
    party:{
        type:String,
        enum:["BJP", "INC", "SPA","DMK","AITC", "AAP", "TDP", "JD(U)", "SHSUBT", "NCPSP", "SHS"],
        required:true
    },
    votes:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'User',
                required: true
            },
            votedAt:{
                type:Date,
                default: Date.now()
            }
        }
    ],
    voteCount:{
        type:Number,
        default:0
    }
});

const Candidate = mongoose.model('Candidates', newCandidate);
module.exports = Candidate;