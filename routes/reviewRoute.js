let {getReview,getReviews,updateReview,deleteReview,createReview}
    =require('../services/reviewServices');
let router=require('express').Router();


router.route('/').post(createReview).get(getReviews);
router.route('/:id').delete(deleteReview).get(getReview).put(updateReview);


module.exports = router;