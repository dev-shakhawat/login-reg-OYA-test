async function Login(req, res) {
    try {
        const { username, password } = req.body;

        const user = await userSchema.findOne({ username });    // find user

        if (!user)  return res.status(404).send("User not found");   // if user not found then return

        const isValid = await argon2.verify(user.password, password);   // check password 

        if (!isValid) return res.status(401).send("Invalid password");  // if password is not valid then return

        return res.status(200).send("Login successful");  

    } catch (error) {
        return res.status(500).send("Something went wrong");
    }
}


module.exports = Login;
