var jwt = require("jsonwebtoken")
var secret = "my_dummy_secret_key";

var setUser = (user) =>{
return jwt.sign({
    username: user.username,
    phoneNumber: user.phoneNumber,
    profileImg: user.profileImg,
}, secret)
}


var getUser = (token) =>{
if(!token) return null

return jwt.verify(token, secret);
}

module.exports ={setUser, getUser};