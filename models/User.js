const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
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
        required:true
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

userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('user')) return next();
    try{
        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    }catch(err){
        next(err);
    }
});

userSchema.methods.comparePassword= async function(userPassword){
    try{
        const isMatch = await bcrypt.compare(userPassword, this.password)
        return isMatch;
    }catch(err){
        throw err;
    }
}


const User = mongoose.model('Users',userSchema);
module.exports = User;

