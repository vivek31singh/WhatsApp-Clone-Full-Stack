var express = require("express");
var router = express.Router();
const randomOtp = require("random-otp-generator");
const { isUserAuth } = require("../isUserAuth");
const {userModel} = require("../DbConnect")

router.post("/generateOTP", async function (req, res) {
  const { phoneNumber } = req.body;

  if (!phoneNumber || phoneNumber.trim() === "") {
    return res
      .status(400)
      .json({ success: false, error: "Phone number is empty" });
  }

  req.session.phoneNumber = phoneNumber;
  req.session.otp = (await randomOtp(6)).toString();
  // console.log("Session ID in generateOTP:", req.sessionID);
  // console.log("generateOTP:", req.session.otp);

  res.json({ success: true, session: req.session });
});

router.get("/sendOTP", function (req, res) {
  // console.log("Session ID in sendOTP:", req.sessionID);
  // console.log("sendOTP:", req.session.otp);

  const otpValue = req.session.otp ? req.session.otp : "N/A";
  res.json({ otp: otpValue, session: req.session });
});




router.get("/fetchAllUsers/:phoneNumber", isUserAuth, async function (req, res) {
 const phoneNumber= req.params.phoneNumber
console.log(phoneNumber);
const resp = await userModel.find({ phoneNumber: { $ne: phoneNumber } });
  res.json({resp});
});



module.exports = router;
