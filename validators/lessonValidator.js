let {check}=require("express-validator");
let validationResult=require('../middlewares/validation');


let Subject=require('../models/subjectModel');


let createLessonValidator=[
    check('content').notEmpty().withMessage('content is required')
    ,check('name').notEmpty().withMessage('name is required')
    ,check('video').notEmpty().withMessage('video is required'),
    check('subject').notEmpty().withMessage('subject is required')
    .custom((val)=>{
        Subject.findById(val).then((subject)=>{
            if(!subject){
                return Promise.reject(new Error('Invalid subject'));
            };
        });
        return true;
    })
    ,
    validationResult
];

let updateLessonValiator=[
    check('id').isMongoId().withMessage('invalid format'),
    validationResult
];

let deleteLessonValiator=[
    check('id').isMongoId().withMessage('invalid format'),
    validationResult
];

let getLessonValiator=[
    check('id').isMongoId().withMessage('invalid format'),
    validationResult
];