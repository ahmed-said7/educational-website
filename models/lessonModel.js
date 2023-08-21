
let mongoose = require('mongoose');

let lessonSchema=new mongoose.Schema(
    {    
        name:String,
        content:String,
        video:String,
        subject:{
            type:mongoose.Schema.ObjectId,
            ref:'Subject'
        }
        ,rating:{
            type:Number,
            default:0
        }
    }
    ,
    {
        timestamps:true
    }
);

let lessonModel=mongoose.model('Lesson',lessonSchema);

module.exports=lessonModel;