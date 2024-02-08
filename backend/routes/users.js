var express = require("express");
var router = express.Router();
const { userModel } = require("../DbConnect.js");
const { setUser, getUser } = require("../token.js");
const multer = require("multer");
const { isUserAuth } = require("../isUserAuth.js");

// creating storage for profile Image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, "")}`);
  },
});

const upload = multer({ storage });

// creating storage for Post uploads
const postStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/postUploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, "")}`);
  },
});

const postUpload = multer({ storage: postStorage });

router.post("/registerUser", async function (req, res) {
  try {
    const { OTP } = req.body;
    const providedOTP = OTP;
    const storedOTP = req.session.otp;

    const foundedUser = await userModel.findOne({
      phoneNumber: req.session.phoneNumber,
    });

    console.log("providedOTP", providedOTP, "stored OTP", storedOTP);
    if (!isNaN(providedOTP) && !isNaN(storedOTP) && providedOTP === storedOTP) {
      let newUser;
      if (!foundedUser) {
        // If no user found, create a new user
        newUser = await userModel.create({
          username: "Username",
          phoneNumber: req.session.phoneNumber,
          profileImg:
            "uploads/1704771612641-AbujaEconomicForum(@abujaeconomic-forum)-Trepup.jpg",
          status: "Available",
        });

        const token = setUser(newUser);
        res.cookie("uid", token);
        // Clean up session data
        delete req.session.otp;
        delete req.session.phoneNumber;

        return res.status(201).json({ success: true, data: newUser });
      } else {
        // If user found, send an authentication successful message
        const token = setUser(foundedUser || newUser);
        res.cookie("uid", token); // Set the cookie here
        return res
          .status(200)
          .json({
            success: true,
            message: "Authentication successful",
            data: newUser,
          });
      }
    } else {
      return res.status(400).json({ success: false, error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({ success: false, error: "Invalid OTP" });
  }
});

// uploading and retriving profile image

router.patch(
  "/uploadProfileImage/:phoneNumber",
  upload.single("profileImage"),
  async function (req, res) {
    try {
      const profileImage = req.file.path;
      const phoneNumber = req.params.phoneNumber;
      let updatedUser = await userModel.findOneAndUpdate(
        { phoneNumber: phoneNumber },
        { $set: { profileImg: profileImage } },
        { new: true }
      );

      // Check if the user was found and updated
      if (updatedUser) {
        const imagePath = `${req.protocol}://${req.get(
          "host"
        )}/${updatedUser.profileImg.replace(/\\/g, "/")}`;
        console.log("imagepath", imagePath);
        res.status(200).json({ profileImage: imagePath });
      } else {
        res.status(404).send("User not found");
      }

      // Handle further logic here
    } catch (error) {
      console.error("Error uploading profile image:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get(
  "/profileImage/:phoneNumber",

  async function (req, res) {
    try {
      const phoneNumber = req.params.phoneNumber;

      let updatedUser = await userModel.findOne({ phoneNumber: phoneNumber });

      if (updatedUser) {
        res.status(200).json({ profileImage: updatedUser.profileImg });
      } else {
        res.status(404).send("User not found");
      }

      // Handle further logic here
    } catch (error) {
      console.error("Error uploading profile image:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.patch("/removeProfileImage/:phoneNumber", async function (req, res) {
  try {
    const phoneNumber = req.params.phoneNumber;

    let updatedUser = await userModel.findOneAndUpdate(
      { phoneNumber: phoneNumber },
      { $set: { profileImg: "" } },
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json({ message: "Profile image updated successfully" });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error updating profile image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.patch("/updateUsersUsername/:phoneNumber", async function (req, res) {
  try {
    const phoneNumber = req.params.phoneNumber;
    const { editedName } = req.body;
    console.log(editedName);
    let updatedUser = await userModel.findOneAndUpdate(
      { phoneNumber: phoneNumber },
      { $set: { username: editedName } },
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json({ username: updatedUser.username });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error updating user information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.patch("/updateUsersStatus/:phoneNumber", async function (req, res) {
  try {
    const phoneNumber = req.params.phoneNumber;
    const { editedStatus } = req.body;

    let updatedUser = await userModel.findOneAndUpdate(
      { phoneNumber: phoneNumber },
      { $set: { status: editedStatus } },
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json({ status: updatedUser.status });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error updating user information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/fetchUserInfo/:phoneNumber", async function (req, res) {
  try {
    const phoneNumber = req.params.phoneNumber;

    let user = await userModel.findOne({ phoneNumber: phoneNumber });

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error locating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
