const mailSend = require("../helpers/mailler");
const OTP = require("../helpers/otp");
const userSchema = require("../model/userSchema");
const argon2 = require('argon2');

async function Registration(req, res) {
    try {
        
        let { username, email, number, password  } = req.body;
        const errors = {};

        // trim
        username = username?.trim();
        email = email?.trim();
        number = number?.trim();
        password = password?.trim();


        // usernme error handle
        if(!username ) errors.username = "Username is required";
        if(username  && username.length < 3) errors.username = "Username must be at least 3 characters";
        if(username  && username.length > 50) errors.username = "Username must be less than 50 characters";


        // email error handle
        if(!email) errors.email = "Email is required"; 
        if(!email.includes('@')) errors.email = "Email must have @"; 


        // number error handle
        if(!number) errors.number = "Number is required";
        if(number && number.length !== 11) errors.number = "Number must be 11 digits"; 
        if(number && !number.startsWith("01")) errors.number = "Number must start with 01"; 
        

        // password error handle
        if(!password) errors.password = "Password is required";
        if(password && password.length < 7 ) errors.password = "Password must be at least 7 characters";
        if(password && password.length > 49) errors.password = "Password must be less than 49 characters";
 
        
        // send if errors
        if(Object.keys(errors).length > 0) return res.status(400).send({ success: false ,  errors })


        // check if user already exist
        const existingUser = await userSchema.findOne({ $or: [{username} , { email }, { number }] });
        if(existingUser) return res.status(400).send({ success: false, error: "User already exists" });



        // hash password
        let hashedPassword;
        try {

            hashedPassword = await argon2.hash(password.trim());

        } catch (err) { 
            return res.status(500).send({ success: false, error: err || "Password hashing error , try again or contact admin" });
        }


        // otp generate
        const otp = OTP(8);


        // create new user 
        const user =  await userSchema.create({ username ,  email , number ,  password: hashedPassword  })
            

        if(!user) return res.status(400).send({ success: false, error: "User not created , try again" });

        // send otp to mail
        await mailSend(username, otp , email);

        return res.status(200).send({ success: true, user });
        

    } catch (error) {
        console.log(error);
        return res.status(500).send(error); 
    }
}

module.exports = Registration;




 