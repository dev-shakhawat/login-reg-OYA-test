function OTP(length = 6 ) {
 
    let otp = "";
    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10); // 0 to 9 digit
    }
    return otp;
}

module.exports = OTP