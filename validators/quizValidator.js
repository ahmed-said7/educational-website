let {check}=require("express-validator");
let validationResult=require('../middlewares/validation');


let createQuizValidator=[
    check('subject').notEmpty().withMessage('Subject is required'),
    validationResult
];

let updateQuizValidator=[
    check('id').isMongoId().withMessage('Id is required'),
    validationResult
];


let deleteQuizValidator=[
    check('id').isMongoId().withMessage('Id is required'),
    validationResult
];

let getQuizValidator=[
    check('id').isMongoId().withMessage('Id is required'),
    validationResult
];