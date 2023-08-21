let {getLesson,getLessons,updateLesson,deleteLesson,createLesson}
    =require('../services/lessonServices');


let router=require('express').Router();


router.route('/').post(createLesson).get(getLessons);

router.route('/:id').delete(deleteLesson).get(getLesson).put(updateLesson);


module.exports = router;