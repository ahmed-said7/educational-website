let {check}=require("express-validator");
let validationResult=require('../middlewares/validation');


let User=require('../models/userModel');



let createInternshipValidation=[
    check('qualification').notEmpty().withMessage('qualification is required')
    .isArray().withMessage('qualification must be an array'),
    check('tracks').notEmpty().withMessage('tracks is required')
    .isArray().withMessage('qualification should be an array'),
    check('name').notEmpty().withMessage('name is required'),
    validationResult
];


let updateInternshipValidation=[
    check('qualification').optional()
    .isArray().withMessage('qualification must be an array'),
    check('tracks').optional()
    .isArray().withMessage('qualification should be an array'),
    check('name').optional(),
    validationResult
];


let updateInternshipApplicantValidation=[
    check('id').isMongoId().withMessage('id should be a Mongo Id'),
    check('user').notEmpty().withMessage('user is required')
    .custom((val)=>{
        User.findById(val).then((user)=>{
            if(!user){
                return Promise.reject(new Error('User not found'))
            };
        });
        return true;
    }),
    validationResult
];

let deleteInternship = [
    check('id').isMongoId().withMessage('id should be a Mongo Id'),
    validationResult
];

let getInternship = [
    check('id').isMongoId().withMessage('id should be a Mongo Id'),
    validationResult
];