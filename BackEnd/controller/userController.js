// const httpError = require('../model/error-http');
// const { v4: uuidv4} = require('uuid');
const { config } = require('dotenv');
const {validationResult} = require('express-validator');
const User = require('../model/userSchema');
const httpError = require('../model/error-http');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

config();


const userList = async (req,res,next)=>{

    let users;
    try {
      users = await User.find({}, '-password');
    } catch (err) {
      const error = new httpError(
        'Fetching users failed, please try again later.',
        500
      );
      return next(error);
    }
    res.json({users: users.map(user => user.toObject({ getters: true }))});

}

const userSignUp = async (req,res,next) =>{
    const error = validationResult(req);
   
    if(!error.isEmpty()){
    return next(new httpError("invalid input is passed ,please check your data",422)) ;
    }
    const {name,email,password} = req.body;

     let existingData;
    try{
        existingData = await User.findOne({email:email});
    }catch(e){
        return next(new httpError("Signing up is failed , plz try again",500));
    }

    if(existingData){
        return next(new httpError("User is already exist , plz login instead",422));
    }

    let hashePassword ;

    try{
        hashePassword = await bcrypt.hash(password,12); 
    }catch(err){
        return next(new httpError("Signing up is failed , plz try again",401));
    }

   
    
    const userData = new User({
        name,
        email,
        password:hashePassword,
        image:req.file.path,
        places:[]

    })
    
    try{
        await userData.save();
    }catch(e){
        return next(new httpError("Failed to signning up"+e.message,500));

    }
    // DUMMY_USER.push(userData);
    let token ;
    try{
        token = jwt.sign({userId:userData.id,email:userData.email},process.env.JWT_KEY,{expiresIn:'1h'})
    }catch(err){
        return next(new httpError("Failed to signning up",500));
    }
    res.json({userId:userData.id,email:userData.email,token:token});
}

const login = async (req,res,next)=>{
    const {email,password} = req.body;

     let existingData;
    try{
        existingData = await User.findOne({email:email});
    }catch(e){
        return next(new httpError("login failed plz try again",500));
    }

    if( !existingData){
        return next(new httpError("invalid logged in",422));
    }

    let checkPasswordValidation = false;
    try{
        checkPasswordValidation = await bcrypt.compare(password,existingData.password);
    }catch(err){
        return next(new httpError("login failed plz try again",500));
    }

    if(!checkPasswordValidation){
        return next(new httpError("invalid password ",401));
    }

    let token ;
    try{
        token = jwt.sign({userId:existingData.id,email:existingData.email},process.env.JWT_KEY,{expiresIn:'1h'})
    }catch(err){
        return next(new httpError("Failed to signning up",500));
    }



    res.json({userId:existingData.id,email:existingData.email,token:token});
}

exports.userList = userList
exports.userSignUp = userSignUp
exports.login = login