
let express= require('express');
let app = express();
let morgan = require('morgan');
let mongoStore=require('connect-mongo')
let session=require('express-session');
let passport=require('passport');
require('dotenv').config();
let connectToDatabase=require('./config/database');
let cors=require('cors');





connectToDatabase();

app.use(session({
    saveUninitialized:true,
    resave:false,
    secret:'some secret',
    store:mongoStore.create({
        mongoUrl: process.env.URL,
        ttl:1000*3600*24
    })
}));


require('./utils/passport');
app.use(passport.initialize());
app.use(passport.session());
require('./apis')(app);







let server=app.listen(4010,()=>{
    console.log('listening on port 4010');
});

let io=require('socket.io')(server);
require('./socket')(io);