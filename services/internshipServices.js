let InternshipModel=require('../models/internshipModel');
require('dotenv').config();
let apiFeatures=require('../utils/apiFeatures');
let asyncHandler=require('express-async-handler');
let apiError=require('../utils/apiError');



let createInternship = asyncHandler(async(req,res,next)=>{
    let Internship=await InternshipModel.create(req.body);
    if(!Internship){
        return next(new apiError('can not create Internship',400));
    };
    res.status(200).json({Internship});
});


let deleteInternship = asyncHandler(async(req,res,next)=>{
    let Internship=await InternshipModel.findByIdAndDelete(req.params.id);
    if(!Internship){
        return next(new apiError('can not delete Internship',400));
    };
    res.status(200).json({Internship});
});


let updateInternship = asyncHandler(async(req,res,next)=>{
    let Internship=await InternshipModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!Internship){
        return next(new apiError('can not update Internship',400));
    };
    res.status(200).json({Internship});
});


let getInternship = asyncHandler(async(req,res,next)=>{
    let Internship=await InternshipModel.findById(req.params.id);
    if(!Internship){
        return next(new apiError('can not get Internship',400));
    };
    res.status(200).json({Internship});
});


let getInternships = asyncHandler(async(req,res,next)=>{
    let features=new apiFeatures(InternshipModel.find(),req.query).
        filter().sort().selectFields().search().pagination();
    let Internships = await features.query;
    if(!Internships){
        return next(new apiError('can not get Internships',400));
    };
    res.status(200).json({Internships});
});


module.exports={getInternship,getInternships,updateInternship,deleteInternship,createInternship};
