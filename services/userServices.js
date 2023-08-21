let User=require('../models/userModel');
require('dotenv').config();
let apiFeatures=require('../utils/apiFeatures');
let asyncHandler=require('express-async-handler');
let apiError=require('../utils/apiError');
const { response } = require('express');


let createUser = asyncHandler(async(req,res,next)=>{
    let user=await User.create(req.body);
    if(!user){
        return next(new apiError('can not create user',400))
    };
    res.status(200).json({user});
});


let deleteUser = asyncHandler(async(req,res,next)=>{
    let user=await User.findByIdAndDelete(req.params.id);
    if(!user){
        return next(new apiError('can not delete user',400))
    };
    res.status(200).json({user});
});


let updateUser = asyncHandler(async(req,res,next)=>{
    let user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!user){
        return next(new apiError('can not update user',400))
    };
    res.status(200).json({user});
});


let getUser = asyncHandler(async(req,res,next)=>{
    let user=await User.findById(req.params.id);
    if(!user){
        return next(new apiError('can not get user',400))
    };
    res.status(200).json({user});
});


let getUsers = asyncHandler(async(req,res,next)=>{
    let features=new apiFeatures(User.find(),req.query).
        filter().sort().selectFields().search().pagination();
    let users = await features.query;
    if(!users){
        return next(new apiError('can not get users',400))
    };
    res.status(200).json({users});
});


let getLoggedUser=asyncHandler(async(req,res,next)=>{
    res.status(200).json({user:req.user});
});

let updateLoggedUser=asyncHandler(async(req,res,next)=>{
    let user=await User.findByIdAndUpdate(req.user._id,req.body,{new:true});
    if(!user){
        return next(new apiError('can not get user',400))
    };
    res.status(200).json({user});
});

let deleteLoggedUser=asyncHandler(async(req,res,next)=>{
    let user=await User.findByIdAndDelete(req.user._id);
    res.status(200).json({status:'deleted'});
});

let updateLoggedUserPassword=asyncHandler(async(req,res,next)=>{
    let {password}=req.body;
    let user=await User.findByIdAndUpdate(req.user._id,
        {
            password,passwordChangedAt:Date.now()
        }
    ,{new:true});
    if(!user){
        return next(new apiError('can not get user',400))
    };
    res.status(200).json({user});
});

module.exports={updateLoggedUser,updateLoggedUserPassword,
    updateUser,createUser,getUser,getUsers,deleteUser,deleteLoggedUser};