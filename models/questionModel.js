
let mongoose = require('mongoose');

let questionSchema=new mongoose.Schema(
    {    
        question:String,
        answers:[String],
        correctAnswer:String,
        degree:Number,
        quiz:{
            type:mongoose.Schema.ObjectId,
            ref:'Quiz'
        }
    }
    ,
    {timestamps:true}
);

let questionModel=mongoose.model('Question',questionSchema);

module.exports=questionModel;