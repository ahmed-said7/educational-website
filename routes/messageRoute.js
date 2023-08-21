let {getMessage,getMessages,updateMessage,deleteMessage,createMessage}
    =require('../services/messageServices');
let router=require('express').Router();


router.route('/').post(createMessage).get(getMessages);
router.route('/:id').delete(deleteMessage).get(getMessage).put(updateMessage);


module.exports = router;