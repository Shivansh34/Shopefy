const nodemailer = require('nodemailer');

const sendmail = async (options)=>{
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
        },
    });
    const mailoptions = {
        from: '"Fred Foo  " <foo@example.com>',
        to: options.to,
        subject: options.subject,
        html: options.text,
    }

    transporter.sendMail(mailOptions, function(err,info){
        if (err){
            console.log(err);
        }
        else{
            console.log(info);
        }
    });
};

module.exports = sendmail;