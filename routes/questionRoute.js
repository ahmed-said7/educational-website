let {getQuestion,getQuestions,updateQuestion,deleteQuestion,createQuestion}

    =require('../services/questionServices');

let router=require('express').Router();

router.route('/').post(createQuestion).get(getQuestions);

router.route('/:id').delete(deleteQuestion).get(getQuestion).put(updateQuestion);

module.exports = router;