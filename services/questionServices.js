let Question=require('../models/questionModel');
require('dotenv').config();
let apiFeatures=require('../utils/apiFeatures');
let asyncHandler=require('express-async-handler');
let apiError=require('../utils/apiError');



let createQuestion = asyncHandler(async(req,res,next)=>{
    let question=await Question.create(req.body);
    if(!question){
        return next(new apiError('can not create question',400));
    };
    res.status(200).json({question});
});


let deleteQuestion = asyncHandler(async(req,res,next)=>{
    let question=await Question.findByIdAndDelete(req.params.id);
    if(!question){
        return next(new apiError('can not delete question',400));
    };
    res.status(200).json({question});
});


let updateQuestion = asyncHandler(async(req,res,next)=>{
    let question=await Question.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!question){
        return next(new apiError('can not update question',400));
    };
    res.status(200).json({question});
});


let getQuestion = asyncHandler(async(req,res,next)=>{
    let question=await Question.findById(req.params.id);
    if(!question){
        return next(new apiError('can not get question',400));
    };
    res.status(200).json({question});
});


let getQuestions = asyncHandler(async(req,res,next)=>{
    let features=new apiFeatures(Question.find(),req.query).
        filter().sort().selectFields().search().pagination();
    let questions = await features.query;
    if(!questions){
        return next(new apiError('can not get questions',400));
    };
    res.status(200).json({questions});
});


module.exports={getQuestion,getQuestions,updateQuestion,deleteQuestion,createQuestion};