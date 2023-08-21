let Lesson=require('../models/lessonModel');
require('dotenv').config();
let apiFeatures=require('../utils/apiFeatures');
let asyncHandler=require('express-async-handler');
let apiError=require('../utils/apiError');



let createLesson = asyncHandler(async(req,res,next)=>{
    let lesson=await Lesson.create(req.body);
    if(!lesson){
        return next(new apiError('can not create lesson',400));
    };
    res.status(200).json({lesson});
});


let deleteLesson = asyncHandler(async(req,res,next)=>{
    let lesson=await Lesson.findByIdAndDelete(req.params.id);
    if(!lesson){
        return next(new apiError('can not delete lesson',400));
    };
    res.status(200).json({lesson});
});


let updateLesson = asyncHandler(async(req,res,next)=>{
    let lesson=await Lesson.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!lesson){
        return next(new apiError('can not update lesson',400));
    };
    res.status(200).json({lesson});
});


let getLesson = asyncHandler(async(req,res,next)=>{
    let lesson=await Lesson.findById(req.params.id);
    if(!lesson){
        return next(new apiError('can not get lesson',400));
    };
    res.status(200).json({lesson});
});


let getLessons = asyncHandler(async(req,res,next)=>{
    let features=new apiFeatures(Lesson.find(),req.query).
        filter().sort().selectFields().search().pagination();
    let lessons = await features.query;
    if(!lessons){
        return next(new apiError('can not get lessons',400));
    };
    res.status(200).json({lessons});
});


module.exports={getLesson,getLessons,updateLesson,deleteLesson,createLesson};