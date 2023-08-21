let googleStrategy=require('passport-google-oauth20').Strategy;
require('dotenv').config();
let passport=require('passport');
const User = require('../models/userModel');
let strategy=new googleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:4010/auth/google/callback",
    scope: ['email','profile']
},async function(accessToken,refreshToken, profile, cb){
    let data=profile._json;
    console.log(data);
    let user=await User.findOne({email:data.email});
    console.log(user);
    if(user){
        return cb(null,user);
    };
    user=await User.create({
        name:data.name,
        email:data.email,
        role:'student'
    });
    console.log(user);
    if(user){
        return cb(null,user);
    };
});



passport.use(strategy);

passport.serializeUser((user,cb)=>{
    cb(null,user);
});

passport.deserializeUser((user,cb)=>{
    cb(null,user);
});
