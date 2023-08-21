let {check}=require("express-validator");
let validationResult=require('../middlewares/validation');

let createSubjectValidator=[
    check('department').notEmpty().withMessage('department is required').
    isAlpha().withMessage('department should be string'),
    check('name').notEmpty().withMessage('name is required').
    isAlpha().withMessage('name should be string'),
    check('totalDegree').notEmpty().withMessage('total degree').
    isNumeric().withMessage('total degree should be number'),
    validationResult
];

let updateSubjectValidator=[
    check('id').isMongoId().withMessage('invaluid format'),
    check('department').optional().
    isAlpha().withMessage('department should be string'),
    check('name').optional().
    isAlpha().withMessage('name should be string'),
    check('totalDegree').optional().
    isNumeric().withMessage('total degree should be number'),
    validationResult
];

let deleteSubjectValidator=[
    check('id').isMongoId().withMessage('invaluid format'),
    validationResult
];

let getSubjectValidator=[
    check('id').isMongoId().withMessage('invaluid format'),
    validationResult
];