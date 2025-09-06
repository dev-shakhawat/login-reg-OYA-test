const mongoose = require("mongoose");


async function dbConfig() {
    await mongoose.connect(`mongodb+srv://login-reg:DUr41vShdbiNDKpd@cluster0.mn2y2.mongodb.net/loginreg?retryWrites=true&w=majority&appName=Cluster0`)

    .then(() => console.log("db connected"))
    .catch((err) => console.log(err));
   
  }



module.exports = dbConfig;