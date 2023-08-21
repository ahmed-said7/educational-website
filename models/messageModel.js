
let mongoose = require('mongoose');

let messageSchema=new mongoose.Schema(
    {    
        senderId:{
            type:mongoose.Schema.ObjectId,
            ref:'User'
        }
        ,recipientId:[{
            type:mongoose.Schema.ObjectId,
            ref:'User'
        },],
        content:String,media:[String]
    }
    ,
    {timestamps:true}
);

let messageModel=mongoose.model('Message',messageSchema);

module.exports=messageModel;