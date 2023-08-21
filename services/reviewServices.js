let Review=require('../models/reviewModel');
require('dotenv').config();
let apiFeatures=require('../utils/apiFeatures');
let asyncHandler=require('express-async-handler');
let apiError=require('../utils/apiError');



let createReview= asyncHandler(async(req,res,next)=>{
    // req.body.user=req.user._id;
    let review=await Review.create(req.body);
    if(!review){
        return next(new apiError('can not create review',400));
    };
    res.status(200).json({review});
});


let deleteReview= asyncHandler(async(req,res,next)=>{
    let review=await Review.findByIdAndDelete(req.params.id);
    if(!review){
        return next(new apiError('can not delete review',400));
    };
    res.status(200).json({review});
});


let updateReview= asyncHandler(async(req,res,next)=>{
    let review=await Review.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!review){
        return next(new apiError('can not update review',400));
    };
    res.status(200).json({review});
});


let getReview= asyncHandler(async(req,res,next)=>{
    let review=await Review.findById(req.params.id);
    if(!review){
        return next(new apiError('can not get review',400));
    };
    res.status(200).json({review});
});


let getReviews = asyncHandler(async(req,res,next)=>{
    let features=new apiFeatures(Review.find(),req.query).
        filter().sort().selectFields().search().pagination();
    let reviews = await features.query;
    if(!reviews){
        return next(new apiError('can not get reviews',400));
    };
    res.status(200).json({reviews});
});


module.exports={getReview,getReviews,updateReview,deleteReview,createReview};