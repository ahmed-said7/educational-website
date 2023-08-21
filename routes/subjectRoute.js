let {getSubject,getSubjects,updateSubject,deleteSubject,createSubject}
    =require('../services/subjectServices');
let router=require('express').Router();


router.route('/').post(createSubject).get(getSubjects);
router.route('/:id').delete(deleteSubject).get(getSubject).put(updateSubject);


module.exports = router;