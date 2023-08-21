let express= require('express');
let cors= require('cors');
let morgan= require('morgan');
let apis=(app)=>{
    
    app.set('view engine', 'ejs');
    app.use(express.json());
    app.use(morgan('dev'));
    app.use(express.static('public'));
    app.use(cors({origin:'*'}));
    
    let googleRoute=require('./routes/googleRoute');
    let videoRoute=require('./routes/videoRouter');
    let userRoute=require('./routes/userRoute');
    let subjectRoute=require('./routes/subjectRoute');
    let reviewRoute=require('./routes/reviewRoute');
    let resultRoute=require('./routes/resultRoute');
    let quizRoute=require('./routes/quizRoute');
    let questionRoute=require('./routes/questionRoute');
    let messageRoute=require('./routes/messageRoute');
    let lessonRoute=require('./routes/lessonRoute');
    let internshipRoute=require('./routes/internshipRoute');
    
    
    app.use('/auth',googleRoute);
    app.use('/video',videoRoute);
    app.use('/user',userRoute);
    app.use('/subject',subjectRoute);
    app.use('/review',reviewRoute);
    app.use('/result',resultRoute);
    app.use('/quiz',quizRoute);
    app.use('/question',questionRoute);
    app.use('/message',messageRoute);
    app.use('/lesson',lessonRoute);
    app.use('/internship',internshipRoute);
    
};
module.exports =apis;