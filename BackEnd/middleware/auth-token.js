const { config } = require('dotenv');
const jwt = require('jsonwebtoken');
const httpError = require('../model/error-http');

config();
module.exports = (req,res,next) =>{
    if(req.method === 'OPTIONS'){
        return next();
    }
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            throw new httpError("authentication failed");
        }
        const decodetoken = jwt.verify(token,process.env.JWT_KEY);
        req.userData = {userId:decodetoken.userId}
        next();
    }catch(err){
        return next(new httpError("authentication failed",401))
    }
   

}