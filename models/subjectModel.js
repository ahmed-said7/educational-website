
let mongoose = require('mongoose');

let subjectSchema=new mongoose.Schema(
    {    
        department:String,
        name:String,
        totalDegree:Number,
        students:[{
            type:mongoose.Schema.ObjectId,
            ref:'User'
        }],
        instructors:[{
            type:mongoose.Schema.ObjectId,
            ref:'User'
        }]
    }
    ,
    {timestamps:true}
);

let subjectModel=mongoose.model('Subject',subjectSchema);

module.exports=subjectModel;