let mongoose = require('mongoose');

let internshipSchema=new mongoose.Schema(
    {    
        name:String,
        tracks:[String],
        qualifications:[String],
        applicants:[{
            type:mongoose.Schema.ObjectId,
            ref:'User'
        },]
    }
    ,
    {
        timestamps:true
    }
);

let internshipModel=mongoose.model('Internship',internshipSchema);

module.exports=internshipModel;