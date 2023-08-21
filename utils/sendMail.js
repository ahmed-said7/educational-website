let nodeMailer=require('nodemailer');


let transport=nodeMailer.createTransport({
    host:'smtp.gmail.com',service:'gmail',port:587,secure:false,
    auth:{user:process.env.USER,pass:process.env.PASS}
});
module.exports = transport;