const mailSend = require("../helpers/mailler");
const OTP = require("../helpers/otp");
const userSchema = require("../model/userSchema");
const argon2 = require('argon2');

async function Registration(req, res) {
    try {
        
        const { username, email, number, password  } = req.body;
        const errors = {};


        // usernme error handle
        if(!username.trim()) errors.username = "Username is required";
        if(username.trim() && username.trim().length < 3) errors.username = "Username must be at least 3 characters";
        if(username.trim() && username.trim().length > 50) errors.username = "Username must be less than 50 characters";


        // email error handle
        if(!email.trim()) errors.email = "Email is required"; 
        if(!email.trim().includes('@')) errors.email = "Email must have @"; 


        // number error handle
        if(!number.trim()) errors.number = "Number is required";
        if(number.trim() && number.trim().length !== 11) errors.number = "Number must be 11 digits"; 
        if(number.trim() && !number.trim().startsWith("01")) errors.number = "Number must start with 01"; 
        

        // password error handle
        if(!password.trim()) errors.password = "Password is required";
        if(password.trim() && password.trim().length < 7 ) errors.password = "Password must be at least 7 characters";
        if(password.trim() && password.trim().length > 49) errors.password = "Password must be less than 49 characters";
 
        
        // send if errors
        if(Object.keys(errors).length > 0) return res.status(400).send({ success: false ,  errors })


        // hash password
        try {

            const hash = await argon2.hash(password.trim());
 

            // otp generate
            const otp = OTP(8);

            // send otp to mail
            await mailSend(username, otp);

        
            // create new user 
            const user =  await userSchema.create({ 
                username: username.trim(), 
                email: email.trim(), 
                number: number.trim(), 
                password: hash 
            })
            

            if(user) return res.status(200).send({ success: true, user });

            return res.status(400).send({ success: false, error: "User not created , try again" });

        } catch (err) { 
            return res.status(500).send({ success: false, error: err || "Password hashing error , try again or contact admin" });
        }
        

    } catch (error) {
        console.log(error);
        return res.status(500).send(error); 
    }
}

module.exports = Registration;




 