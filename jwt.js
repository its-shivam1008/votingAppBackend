const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwtAuthMiddleware = function(req,res,next){
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(404).json({error:"Token not found"});
    try{
        const token = req.headers.authorization.split(" ")[1];
        if(!token) return res.status(401).json({error:"Unauthorized"});
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next();
    }catch(err){
        res.status(401).json({error:"Invalid token"});
    }
}

const generateToken = (userData) =>{
    const token = jwt.sign(userData, process.env.JWT_KEY);
    return token;
}

module.exports = {jwtAuthMiddleware, generateToken};