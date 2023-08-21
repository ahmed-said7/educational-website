let {getQuiz,getQuizs,updateQuiz,deleteQuiz,createQuiz}
    =require('../services/quizServices');
let router=require('express').Router();


router.route('/').post(createQuiz).get(getQuizs);
router.route('/:id').delete(deleteQuiz).get(getQuiz).put(updateQuiz);


module.exports = router;