const argon = require("argon2");
const userSchema = require("../model/userSchema");

async function Login(req, res) {
    try {
        const { username, password } = req.body;

        const user = await userSchema.findOne({ username: username.trim()  });    // find user

        if (!user)  return res.status(404).send({ success: false  , message: "User not found"  });   // if user not found then return

        const isValid = await argon.verify(user.password, password.trim());   // check password 

        if (!isValid) return res.status(401).send({ success: false  , message: "Invalid password"  });  // if password is not valid then return

        return res.status(200).send({ success: true  , message: "Login successful"  });  

    } catch (error) {
        return res.status(500).send({ success: false  , message: error.message ||  "Internal server error"  });
    }
}


module.exports = Login;
