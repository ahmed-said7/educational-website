let {check}=require("express-validator");
let validationResult=require('../middlewares/validation');
let Quiz=require('../models/quizModel');



let createQuestionValidator=[
    check('question').notEmpty().withMessage('question is required'),
    check('answers').notEmpty().withMessage('answers is required')
    .isArray().withMessage('answers should be an array'),
    check('correctAnswer').notEmpty().withMessage('correctAnswer is required'),
    check('quiz').notEmpty().withMessage('quiz is required').custom((val)=>{
        Quiz.findById(val).then((quiz)=>{
            if(!quiz){
                return Promise.reject(new Error('quiz not found'));
            }
        })
        return true;
    }),validationResult
];


let updateQuestionValidator=[
    check('id').isMongoId().withMessage('invalid format'),
    check('question').notEmpty().withMessage('question is required'),
    check('answers').optional()
    .isArray().withMessage('answers should be an array'),
    check('correctAnswer').notEmpty().withMessage('correctAnswer is required'),
    ,validationResult
];

let deleteQuestionValidator=[
    check('id').isMongoId().withMessage('invalid format'),
    ,validationResult
];

let getQuestionValidator=[
    check('id').isMongoId().withMessage('invalid format'),
    ,validationResult
];