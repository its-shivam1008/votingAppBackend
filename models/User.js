const mongoose = require('mongoose');

const newUser = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    adhaarNum:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    userType:{
        type:String,
        enum:["admin","voter"],
        default:"voter"
    },
    isVoted:{
        type:Boolean,
        default:false
    },
    address:{
        type:String,
        required:true
    },
    contactNum:{
        type:String,
        required:true
    }
});

const User = mongoose.model('Users',newUser);
module.exports = User;

