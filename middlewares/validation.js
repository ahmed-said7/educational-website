let {validationResult}=require('express-validator');

let validatorResult=(req,res,next)=>{
    let errors=validatorResult(req);
    if(!errors.notEmpty()){
        return res.status(400).json({errors:errors.array()})
    };
    next();
};


module.exports = validatorResult;

