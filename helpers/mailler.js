const nodemailer = require("nodemailer");
 
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user:  process.env.AUTH_MAIL,
    pass: process.env.APP_PASS,
  },
});
 

async function mailSend(username , otp){

    await transporter.sendMail({
    from: "Signup-Login Test Exam OYA",
    to: process.env.AUTH_MAIL,
    subject: "Signup-Login Test Exam OYA Verification Mail", 
    html: `<b>Hello ${username} , Your account verification code is ${otp}</b>`,  
  });

}


module.exports = mailSend