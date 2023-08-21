let {check}=require("express-validator");
let validationResult=require('../middlewares/validation');
let bcryptjs=require('bcryptjs');

let User=require('../models/userModel');


let createUserValidator=[
    check('name').notEmpty().withMessage('Please enter name'),
    check('email').notEmpty().withMessage('Please enter email')
    .isEmail().withMessage('Please enter email valid email').custom((val)=>{
        User.findOne({ email: val}).then((user)=>{
            if(user){
                return Promise.reject(new Error(' Please enter another email'));
            };
        });
        return true;
    }),
    check('password').notEmpty().withMessage('not a valid password')
    ,check('passwordConfirm').notEmpty().withMessage('password is not a valid password').custom((val,{req})=>{
        if(val !== req.body.password){
            return Promise.reject(new Error('Invalid password confirmation'))
        };
        return true;
    }),validationResult
];

let updateUserValidator=[
    check('name').optional(),
    check('email').optional()
    .isEmail().withMessage('Please enter email valid email').custom((val)=>{
        User.findOne({ email: val}).then((user)=>{
            if(user){
                return Promise.reject(new Error(' Please enter another email'));
            };
        });
        return true;
    }),
    ,
    check('password').optional()
    ,check('passwordConfirm').optional().custom((val,{req})=>{
        if(val !== req.body.password){
            return Promise.reject(new Error('Invalid password confirmation'))
        };
        return true;
    }),validationResult
];


let deleteUserValidator=[
    check('id').isMongoId().withMessage('invalid format'),
    validationResult
];

let getUserValidator=[
    check('id').isMongoId().withMessage('invalid format'),
    validationResult
];

let updateLoggedUserPassword=[
    check('currentPassword').notEmpty().withMessage('invalid format')
    .custom((val,{req})=>{
        bcryptjs.compare(val,user.password).then((valid)=>{
            if(!valid){
                return Promise.reject(new Error('Invalid password'))
            };
        });
        return true;
    }),
    check('password').notEmpty().withMessage('not a valid password')
    ,check('passwordConfirm').notEmpty().withMessage('password is not a valid password').custom((val,{req})=>{
        if(val !== req.body.password){
            return Promise.reject(new Error('Invalid password confirmation'))
        };
        return true;
    }),validationResult,
];

let updateLoggedUser =[
    check('name').optional(),
    check('email').optional()
    .isEmail().withMessage('Please enter email valid email').custom((val)=>{
        User.findOne({ email: val}).then((user)=>{
            if(user){
                return Promise.reject(new Error(' Please enter another email'));
            };
        });
        return true;
    })
    ,validationResult
];