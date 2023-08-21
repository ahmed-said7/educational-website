let Chat=require('../models/chatModel');

require('dotenv').config();

let apiFeatures=require('../utils/apiFeatures');

let asyncHandler=require('express-async-handler');

let apiError=require('../utils/apiError');



let createChat = asyncHandler(async(req,res,next)=>{
    req.body.members.push(req.user._id);
    let chat=await Chat.create(req.body);
    if(!chat){
        return next(new apiError('can not create chat',400));
    };
    res.status(200).json({chat});
});


let deleteChat = asyncHandler(async(req,res,next)=>{
    let chat=await Chat.findOneAndDelete({
        _id:req.params.id,
        members:{$all:[req.user._id]}
        });
    if(!chat){
        return next(new apiError('can not delete chat',400));
    };
    res.status(200).json({chat});
});


let updateChat = asyncHandler(async(req,res,next)=>{
    let chat=await Chat.findOneAndUpdate(
        {
        _id:req.params.id,
        members:{$all:[req.user._id]}
        },req.body,{new:true});
    if(!chat){
        return next(new apiError('can not update chat',400));
    };
    res.status(200).json({chat});
});


let getChat = asyncHandler(async(req,res,next)=>{
    let chat=await Chat.findOne(
        {
        _id:req.params.id,
        members:{$all:[req.user._id]}
        }
        );
    if(!chat){
        return next(new apiError('can not get chat',400));
    };
    res.status(200).json({chat});
});


let getChats = asyncHandler(async(req,res,next)=>{
    let features=new apiFeatures(Chat.find({members:{$all:[req.user._id]}}),req.query).
        filter().pagination();
    let chats = await features.query;
    if(!chats){
        return next(new apiError('can not get chats',400));
    };
    res.status(200).json({chats});
});


module.exports={getChat,getChats,updateChat,deleteChat,createChat};