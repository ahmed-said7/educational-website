let {check}=require("express-validator");
let validationResult=require('../middlewares/validation');
let User=require('../models/userModel');


let createResultValidator=[
    check('level').notEmpty().withMessage('level is required')
    ,check('subjects').notEmpty().withMessage('subjects is required').
    isArray().withMessage('subjects should be an array'),
    validationResult
];

let updateResultValidator=[
    check('id').isMongoId().withMessage('invalid format'),
    check('subjects').optional().
    isArray().withMessage('subjects should be an array'),
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