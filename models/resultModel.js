let mongoose = require('mongoose');
let User=require('../models/userModel')
let resultSchema=new mongoose.Schema(
    {    
        level:String,
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'User'
        },
        subjects:[{subject:String,totalDegree:Number,degree:Number,rating:String}],
        totalDegree:Number,
        rating:String,
    }
    ,
    {timestamps:true}
);

resultSchema.post('save',async function(doc){
    let data=await reviewModel.aggregate([{$match:{user:this.user}},
        {$group:{_id:"$user",average:{$avg:this.totalDegree},count:{$sum:1}}}]);
    if(data.lengt>0){
        let average=data[0].average;
        let count=data[0].count;
        average=Math.round((average/count)*100);
        await User.findByIdAndUpdate(this.user,{overRating:average});
    }
    
})

resultSchema.post('delete',async function(doc){
    let data=await reviewModel.aggregate([{$match:{user:this.user}},
        {$group:{_id:"$user",average:{$avg:this.totalDegree},count:{$sum:1}}}]);
    if(data.lengt>0){
        let average=data[0].average;
        let count=data[0].count;
        average=Math.round((average/count)*100);
        await User.findByIdAndUpdate(this.user,{overRating:average});
    }
    
})

let resultModel=mongoose.model('Result',resultSchema);

module.exports=resultModel;

