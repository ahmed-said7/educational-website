let Quiz=require('../models/quizModel');
require('dotenv').config();
let apiFeatures=require('../utils/apiFeatures');
let asyncHandler=require('express-async-handler');
let apiError=require('../utils/apiError');



let createQuiz= asyncHandler(async(req,res,next)=>{
    let quiz=await Quiz.create(req.body);
    if(!quiz){
        return next(new apiError('can not create quiz',400));
    };
    res.status(200).json({quiz});
});


let deleteQuiz= asyncHandler(async(req,res,next)=>{
    let quiz=await Quiz.findByIdAndDelete(req.params.id);
    if(!quiz){
        return next(new apiError('can not delete quiz',400));
    };
    res.status(200).json({quiz});
});


let updateQuiz= asyncHandler(async(req,res,next)=>{
    let quiz=await Quiz.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!quiz){
        return next(new apiError('can not update quiz',400));
    };
    res.status(200).json({quiz});
});


let getQuiz= asyncHandler(async(req,res,next)=>{
    let quiz=await Quiz.findById(req.params.id);
    if(!quiz){
        return next(new apiError('can not get quiz',400));
    };
    res.status(200).json({quiz});
});


let getQuizs = asyncHandler(async(req,res,next)=>{
    let features=new apiFeatures(Quiz.find(),req.query).
        filter().sort().selectFields().search().pagination();
    let quizs = await features.query;
    if(!quizs){
        return next(new apiError('can not get quizs',400));
    };
    res.status(200).json({quizs});
});


module.exports={getQuiz,getQuizs,updateQuiz,deleteQuiz,createQuiz};