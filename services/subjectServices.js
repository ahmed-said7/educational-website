let Subject=require('../models/subjectModel');
require('dotenv').config();
let apiFeatures=require('../utils/apiFeatures');
let asyncHandler=require('express-async-handler');
let apiError=require('../utils/apiError');



let createSubject = asyncHandler(async(req,res,next)=>{
    let subject=await Subject.create(req.body);
    if(!subject){
        return next(new apiError('can not create subject',400));
    };
    res.status(200).json({subject});
});


let deleteSubject = asyncHandler(async(req,res,next)=>{
    let subject=await Subject.findByIdAndDelete(req.params.id);
    if(!subject){
        return next(new apiError('can not delete subject',400));
    };
    res.status(200).json({subject});
});


let updateSubject = asyncHandler(async(req,res,next)=>{
    let subject=await Subject.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!subject){
        return next(new apiError('can not update subject',400));
    };
    res.status(200).json({subject});
});


let getSubject = asyncHandler(async(req,res,next)=>{
    let subject=await Subject.findById(req.params.id);
    if(!subject){
        return next(new apiError('can not get subject',400));
    };
    res.status(200).json({subject});
});


let getSubjects = asyncHandler(async(req,res,next)=>{
    let features=new apiFeatures(Subject.find(),req.query).
        filter().sort().selectFields().search().pagination();
    let subjects = await features.query;
    if(!subjects){
        return next(new apiError('can not get subjects',400));
    };
    res.status(200).json({subjects});
});


module.exports={getSubject,getSubjects,updateSubject,deleteSubject,createSubject};