let Result=require('../models/resultModel');
require('dotenv').config();
let apiFeatures=require('../utils/apiFeatures');
let asyncHandler=require('express-async-handler');
let apiError=require('../utils/apiError');



let createResult = asyncHandler(async(req,res,next)=>{
    let [studentDegree,rating,totalDegree,subjects]=[0,0,0,req.body.subjects];
    subjects.forEach((subject)=>{
        studentDegree += subject.degree;
        totalDegree += subject.totalDegree;
    });
    rating=Math.round((studentDegree/totalDegree)*100);
    req.body.totalDegree=studentDegree;
    req.body.rating=rating;
    let result=await Result.create(req.body);
    if(!result){
        return next(new apiError('can not create result',400));
    };
    res.status(200).json({result});
});


let deleteResult= asyncHandler(async(req,res,next)=>{
    let result=await Result.findByIdAndDelete(req.params.id);
    if(!result){
        return next(new apiError('can not delete result',400));
    };
    res.status(200).json({result});
});


let updateResult= asyncHandler(async(req,res,next)=>{
    if(req.body.subjects){
        let [studentDegree,rating,totalDegree,subjects]=[0,0,0,req.body.subjects];
        subjects.forEach((subject)=>{
        studentDegree += subject.degree;
        totalDegree += subject.totalDegree;
        });
        rating=Math.round((studentDegree/totalDegree)*100);
        req.body.totalDegree=studentDegree;
        req.body.rating=rating;
    };
    let result=await Result.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!result){
        return next(new apiError('can not update result',400));
    };
    res.status(200).json({result});
});


let getResult= asyncHandler(async(req,res,next)=>{
    let result=await Result.findById(req.params.id);
    if(!result){
        return next(new apiError('can not get result',400));
    };
    res.status(200).json({result});
});


let getResults = asyncHandler(async(req,res,next)=>{
    let features=new apiFeatures(Result.find(),req.query).
        filter().sort().selectFields().search().pagination();
    let results = await features.query;
    if(!results){
        return next(new apiError('can not get results',400));
    };
    res.status(200).json({results});
});


module.exports={getResult,getResults,updateResult,deleteResult,createResult};