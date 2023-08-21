let {check}=require("express-validator");
let validationResult=require('../middlewares/validation');


let User=require('../models/userModel');

let createMessageValidator=[
    check('recipientId').notEmpty().withMessage('recipient is required')
    .isMongoId().withMessage('invalid format').custom((val)=>{
        User.findById(val).then((user)=>{
            if(!user){
                return Promise.reject(new Error('user not found'));
            }
        });
        return true;
    }),
    check('content').optional(),
    check('media').optional(),
    validationResult
];

let updateMessageValidator=[
    check('id').isMongoId().withMessage('invalid format'),
    validationResult
];

let deleteMessageValidator=[
    check('id').isMongoId().withMessage('invalid format'),
    validationResult
];

let getMessageValidator=[
    check('id').isMongoId().withMessage('invalid format'),
    validationResult
];