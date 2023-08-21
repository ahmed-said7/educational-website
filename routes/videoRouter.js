
let router=require('express').Router();
require('dotenv').config(); 
const apiError = require('../utils/apiError');

router.route('/lobby/:userId').get(async(req,res,next)=>{
    res.render('lobby',{userId:req.params.userId})
});

router.route('/lobby/:userId/:roomId').get(async(req,res,next)=>{
    res.render('index',
                {
                    roomId:req.params.roomId
                    ,userId:req.params.userId
                });
});

module.exports=router;