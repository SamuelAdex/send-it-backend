const nodemailer = require("nodemailer")

module.exports = async (emailTo, emailFrom, subject, text, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', 
            service: 'gmail',
            port: 587,
            secure: true,
            auth: {
                user: 'adexsamuel6@gmail.com',
                pass: process.env.PASS
            }
        });

        const sentEmail = await transporter.sendMail({
            from: emailFrom,
            to: emailTo,
            subject: subject,
            text: text,
            html: html
        }, function (error) {
            if(error){
                console.log(error)
            }else{                
                console.log('Email Sent Successfull')
                next()
            }
        })
        
    }catch(err){
        console.log(err.message)
    }
}