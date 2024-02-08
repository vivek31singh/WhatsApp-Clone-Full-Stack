var mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/WhatsApp");

var userSchema = new mongoose.Schema({
    username: String,
    status:String,
    phoneNumber: Number,
    profileImg: String,
})



module.exports={userModel: mongoose.model("users", userSchema)}