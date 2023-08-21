
let {getInternship,getInternships,updateInternship,deleteInternship,createInternship}
    =require('../services/internshipServices');

let router=require('express').Router();

router.route('/').post(createInternship).get(getInternships);

router.route('/:id').delete(deleteInternship).get(getInternship).put(updateInternship);


module.exports = router;