

let Message=require('../models/messageModel');


require('dotenv').config();
let apiFeatures=require('../utils/apiFeatures');
let asyncHandler=require('express-async-handler');
let apiError=require('../utils/apiError');


let createMessage= asyncHandler(async(req,res,next)=>{
    req.body.senderId=req.user._id;
    let message=await Message.create(req.body);
    if(!message){
        return next(new apiError('can not create message',400));
    };
    res.status(200).json({message});
});


let deleteMessage= asyncHandler(async(req,res,next)=>{
    let message=await Message.findOneAndDelete(
        { _id:req.params.id , $or : [ {senderId : req.user._id} ,{ recipientId : req.user._id} ]}
        );
    if(!message){
        return next(new apiError('can not delete message',400));
    };
    res.status(200).json({message});
});


let updateMessage= asyncHandler(async(req,res,next)=>{
    let message=await Message.findOneAndUpdate(
        {_id:req.params.id,senderId : req.user._id},req.body,{new:true}
        );
    if(!message){
        return next(new apiError('can not update message',400));
    };
    res.status(200).json({message});
});


let getMessage= asyncHandler(async(req,res,next)=>{
    let message=await Message.findOne(
        { _id:req.params.id , $or : [ {senderId : req.user._id} ,{ recipientId : req.user._id} ]}
    );
    if(!message){
        return next(new apiError('can not get message',400));
    };
    res.status(200).json({message});
});


let getMessages = asyncHandler(async(req,res,next)=>{
    let features=new apiFeatures(Message.find(),req.query).
        filter().sort().selectFields().search().pagination();
    let messages = await features.query;
    if(!messages){
        return next(new apiError('can not get messages',400));
    };
    res.status(200).json({messages});
});


module.exports={getMessage,getMessages,updateMessage,deleteMessage,createMessage};