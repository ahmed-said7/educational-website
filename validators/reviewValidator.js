let {check}=require("express-validator");
let validationResult=require('../middlewares/validation');
let User=require('../models/userModel');


let createResultValidator=[
    check('stars').notEmpty().withMessage('level is required').
    isNumeric().withMessage('star should be a number')
    ,check('user').notEmpty().withMessage('user is required').
    isMongoId().withMessage(' invalid format').custom((val)=>{
        User.findById(val).then((user)=>{
            if(!user){
                return Promise.reject(new Error('user not found'));
            }
        })
    }),
    validationResult
];

let updateResultValidator=[
    check('id').isMongoId().withMessage('invalid format'),
    check('stars').optional().
    isNumeric().withMessage('star should be a number')
    ,
    validationResult
];

let deleteResultValidator=[
    check('id').isMongoId().withMessage('invalid format'),
    validationResult
];

let getResultValidator=[
    check('id').isMongoId().withMessage('invalid format'),
    validationResult
];