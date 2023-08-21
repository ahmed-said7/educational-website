
let mongoose = require('mongoose');

let quizSchema=new mongoose.Schema(
    {    
        subject:String,
        totalDegree:Number,
        isOpened:{
            type:Boolean,
            default:false
        }
    }
    ,
    {timestamps:true}
);

let quizModel=mongoose.model('Quiz',quizSchema);

module.exports=quizModel;
