let {check}=require("express-validator");

let validationResult = require('../middlewares/validation');

let User=require('../models/userModel');

let createChatValidator=[
    check('members').notEmpty().withMessage('members is required')
    .isArray().withMessage('members should be an array')
    .custom((val)=>{
        User.find({_id:{$in:val}}).then((users)=>{
            if(users.length !== val.length){
                return Promise.reject(new Error('Invalid members'));
            };
        });
        return true;
    }),validationResult
];


let updateChatValidator=[
    check('id').isMongoId().withMessage('invalid formatt'),
    check('members').notEmpty().withMessage('members is required')
    .isArray().withMessage('members should be an array')
    .custom((val)=>{
        User.find({_id:{$in:val}}).then((users)=>{
            if(users.length !== val.length){
                return Promise.reject(new Error('Invalid members'));
            };
        });
        return true;
    }),validationResult
];


let deleteChatValidator=[
    check('id').isMongoId().withMessage('invalid formatt'),validationResult
];


let getChatValidator=[
    check('id').isMongoId().withMessage('invalid formatt'),validationResult
];
