let {updateLoggedUser,updateLoggedUserPassword,
    updateUser,createUser,getUser,getUsers,deleteUser,deleteLoggedUser}=require('../services/userServices');

let {login,signup,forgetPassword,vertifyCode,changePassword,allowedTo,protected}=require('../services/authServices');

let router=require('express').Router();

router.route('/').post(createUser).get(getUsers);



module.exports =router;