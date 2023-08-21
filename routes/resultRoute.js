let {getResult,getResults,updateResult,deleteResult,createResult}
    =require('../services/resultSevrices');
let router=require('express').Router();


router.route('/').post(createResult).get(getResults);
router.route('/:id').delete(deleteResult).get(getResult).put(updateResult);


module.exports = router;