let User=require('../models/userModel');

require('dotenv').config()
let bcryptjs=require('bcryptjs');
let jwt=require('jsonwebtoken');
let asyncHandler=require('express-async-handler');
let apiError=require('../utils/apiError');
let transport=require('../utils/sendMail');

let login=asyncHandler( async (req,res,next)=>{
    let{email,password}=rqe.body;
    
    let user=await User.findOne({email:email});
    
    if(!user){
        return next(new apiError('password or email is not correct',400));
    };

    let passValidation=await bcryptjs.compare(password,user.password);
    
    if(!passValidation){
        return next(new apiError('password or email is not correct',400));
    };
    let token='bearer '+jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'2d'});

    res.status(200).json({status:'success',token:token,user:user.email});
});


let signup=asyncHandler( async (req,res,next)=>{
    let {email} = req.body;
    let user=await User.findOne({email:email});
    if(user){
        return next(new apiError('enter another email',400));
    };
    user =await User.create(req.body);
    let token='bearer '+jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'2d'});
    res.status(200).json({status:'success',token:token,user:user.email});
});

let protected=asyncHandler( async (req,res,next)=>{
    
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('bearer')){
        token=req.headers.authorization.split(' ')[1];
    };

    if(!token){
        return next(new apiError('enter authorization', 400));
    };
    
    let decoded=jwt.verify(token,process.env.JWT_SECRET);

    let user=await User.findById(decoded.userId);
    
    if(!user){
        return next(new apiError('go and sign up',400));
    };

    if(user.passwordChangedAt){
        let timestamp=decoded.iat * 1000;
        if(timestamp < user.passwordChangedAt){
            return next(new apiError('go and sign again , password changed',400));
        };
    };

    req.user = user;

    next();

});

let allowedTo=(...roles)=>asyncHandler(async (req,res,next)=>{
    if(!roles.includes(req.user._id)){
        return next(new apiError('you are not allowed to access route',400));
    };
    next();
});

let forgetPassword=asyncHandler(async (req,res,next)=>{
    
    let {email}=req.body;
    let user=await User.findOne({email});
    
    if(!user){
        return next(new apiError('User not found',400));
    };
    
    let resetCode=`${Math.floor(Math.random()*899999+100000)}`;
    
    user.passwordResetCode=await bcryptjs.hash(resetCode,10);
    
    user.passwordResetCodeExpiredAt=Date.now()+20*1000*60;
    
    user.passwordVertifyCode=false;
    
    let options={
        from:'educational-app',
        to:user.email,
        subject:'vertification code to change password',
        message:`your verrification code ${resetCode}`
    };
    
    try{
        await transport.sendMail(options);
    }catch(e){
        console.log(e);
        user.passwordResetCode=undefined;
        user.passwordResetCodeExpiredAt=undefined;
        user.passwordVertifyCode=undefined;

    };
    await user.save();
    
    res.status(200).json({status:'success'});

});




let vertifyCode=asyncHandler(async(req,res,next)=>{
    
    let {resetCode,email}=req.body;
    
    let user=await User.findOne({email});

    if(!user){
        return next(new apiError('User not found',400));
    };

    if(Date.now() > user.passwordResetCodeExpiredAt){
        return next(new apiError('resetCode expired',400));
    };

    let vertification=await bcryptjs.vertify(resetCode,user.passwordResetCode);

    if(!vertification){
        return next(new apiError('resetCode is not correct',400));
    };

    user.passwordVertifyCode=true;

    await user.save();

    res.status(200).json({status:'success'});

});

let changePassword=asyncHandler(async (req,res,next)=>{
    let {email,password}=req.body;

    let user=await User.findOne({email});

    if(!user){
        return next(new apiError('User not found',400));
    };

    if(!user.passwordVertifyCode){
        return next(new apiError('vertify resetCode first ',400));
    };

    user =await User.findOneAndUpdate(req.user._id,{password},{new:true});
    let token='bearer '+jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'2d'});
    res.status(200).json({status:'success',token,user:user.email});

});

module.exports = {login,signup,forgetPassword,vertifyCode,changePassword,allowedTo,protected};