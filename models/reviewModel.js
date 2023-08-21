
let mongoose = require('mongoose');
let Lesson=require('../models/lessonModel');
let reviewSchema=new mongoose.Schema(
    
    {    
        comment:String,
        stars:{
            type:Number,
            min:[1,'minimum value is 1'],
            max:[5,'maximum value is 5']
        },
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'User',
        },
        lesson:{
            type:mongoose.Schema.ObjectId,
            ref:'Lesson',
        },
    }
    ,
    {timestamps:true}
);



reviewSchema.statics.calc=async function(lessonId){

}

// let reviewModel=mongoose.model('Review',reviewSchema);

reviewSchema.post('save',async function(doc){
    let data=await reviewModel.aggregate([{$match:{lesson:this.lesson}},
        {$group:{_id:"$lesson",average:{$avg:this.stars},count:{$sum:1}}}]);
    console.log(data[0]);
    if(data.lengt>0){
        let average=data[0].average;
        let count=data[0].count;
        average=Math.round(average/count);
        await Lesson.findByIdAndUpdate(doc.lesson,{rating:average});
    }
    
})

reviewSchema.post('delete',async function(doc){
    let data=await reviewModel.aggregate([{$match:{lesson:this.lesson}},
        {$group:{_id:"$lesson",average:{$avg:this.stars},count:{$sum:1}}}]);
    console.log(data[0]);
    if(data.lengt>0){
        let average=data[0].average;
        let count=data[0].count;
        average=Math.round(average/count);
        await Lesson.findByIdAndUpdate(doc.lesson,{rating:average});
    }
    
});

let reviewModel=mongoose.model('Review',reviewSchema);

module.exports=reviewModel;