
let router=require('express').Router();
require('dotenv').config(); 
let User=require('../models/userModel');

let passport=require('passport');
const apiError = require('../utils/apiError');
let jwt=require('jsonwebtoken');


router.route('/login').get(passport.authenticate('google',{scope:['email','profile']}));
router.route('/google/callback').get(passport.authenticate('google',
    {
        successRedirect:'http://localhost:4010/auth/login/success',
        failureRedirect:'http://localhost:4010/auth/login/failure',
    }
));

router.route('/login/success').get(async(req,res,next)=>{
    if(!req.user){
        return next(new apiError('Login Please',400));
    }
    let user=await User.findOne({email:req.user.email});
    if(!user){
        return next(new apiError('User not found',400));
    };
    let token='bearer '+jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'2d'});
    res.status(200).json({status:'success',token:token,user:user.email});
});

router.route('/login/failure').get(async(req,res,next)=>{
    res.redirect('/login')
});

module.exports = router;