let mongoose = require('mongoose');

let connectToDatabase=()=>{
    mongoose.connect(process.env.URL).then(()=>{
        console.log('Connecting to database')
    }).catch((err)=>{
        // setTimeout(connectToDatabase,1000);
        console.log(err)
    });
};

module.exports=connectToDatabase;