const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Candidate = require("../models/Candidate");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");
const {
  sendVerificationEmailNodeMailer,
} = require("../email/sendEmailVerification");
const { deleteImageFromCloudinary } = require("../deleteImage/deleteImgFromCloudinary");

const adminInDb = async (data) => {
  try {
    if (data.userType == "admin") {
      const findAdmin = await User.findOne({ userType: "admin" });
      return findAdmin == null ? false : true;
    } else {
      return false;
    }
  } catch (err) {
    throw err;
  }
};

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    if (await adminInDb(data)) {
      res
        .status(403)
        .json({ message: "admin is alreaady present.", success: false });
    } else {
      const userByEmail = await User.findOne({
        $or: [{ email: data.email }, { adhaarNum: data.adhaarNum }],
      });
      if (userByEmail) {
        res.status(403).json({
          success: false,
          message: "User with this email or aadhar is already present",
        });
      }else{
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);
  
        const newData = { ...data, verifyCode, verifyCodeExpiry: expiryDate };
        const newPerson = new User(newData);
        const response = await newPerson.save();
  
        const payload = {
          id: response.id,
          name: response.name,
          userType: response.userType,
          isVerified: response.isVerified,
        };
        const token = generateToken(payload);
  
        const emailResponse = await sendVerificationEmailNodeMailer(
          data.email,
          data.name,
          verifyCode
        );
        if (!emailResponse.success) {
          res.status(403).json({ message: emailResponse.message, success: true });
        }
  
        res.status(201).json({
          message: "Verification email has been sent.",
          success: true,
          response,
          token,
        });
      }
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
});

router.get("/verify/:verifyCode", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const verifyCode = req.params.verifyCode;
    const user = await User.findById(userId);
    if (user.verifyCode === verifyCode) {
      if (new Date(user.verifyCodeExpiry) > new Date()) {
        const userVerified = await User.findByIdAndUpdate(userId, {
          isVerified: true,
        });
        if (!userVerified) {
          res
            .status(200)
            .json({ message: "Unable to verify the user", success: false });
        }
        const payload = {
          id: userVerified.id,
          name: userVerified.name,
          userType: userVerified.userType,
          isVerified: userVerified.isVerified,
        };
        const token = generateToken(payload);
        res.status(200).json({
          message: "User has been verified successfully",
          success: true,
          token,
        });
      } else {
        res
          .status(200)
          .json({ message: "Otp has been expired", success: false });
      }
    } else {
      res.status(200).json({ message: "Wrong OTP", success: false });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
});

router.put("/resendOtp", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        message: "Cannot generate otp for a non- existing user",
        success: true,
      });
    }
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    await User.findByIdAndUpdate(user._id, {
      verifyCode: verifyCode,
      verifyCodeExpiry: expiryDate,
    });

    const emailResponse = await sendVerificationEmailNodeMailer(
      user.email,
      user.name,
      verifyCode
    );
    if (!emailResponse.success) {
      res.status(403).json({ message: emailResponse.message, success: true });
    }

    res.status(201).json({
      message: "Verification email has been sent.",
      success: true,
      response,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({
      $or: [{ email: typeof(data.cred) === 'string' ? data.cred : null }, { adhaarNum: !isNaN(data.cred) && !isNaN(parseInt(data.cred)) ? Number(data.cred) : null }],
    });
    if (!user || !(await user.comparePassword(data.password))) {
      res.status(401).json({
        message: "Incorrect Adhaar number or password",
        success: false,
      });
    } else {
      const payload = {
        id: user.id,
        name: user.name,
        userType: user.userType,
        isVerified: user.isVerified,
      };
      const token = generateToken(payload);
      res.status(200).json({ message: "Login success", success: true, token });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error",error:err, success: false });
  }
});

router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found", success: false });
    }
    res.status(200).json({ message: "User found", success: true, user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
});

router.put("/profile/:field", jwtAuthMiddleware, async (req, res) => {
  try {
    const field = req.params.field;
    const data = req.body;
    const userId = req.user.id;
    if (field=='otherFields' || field == "password") {
      if (field == "password") {
        const { currentPass, newPass } = req.body;

        const user = await User.findById(userId);

        if (!user || !(await user.comparePassword(currentPass))) {
          res
            .status(401)
            .json({ message: "Incorrect password", success: false });
        } else {
          user.password = newPass;
          const response = await user.save();

          res
            .status(200)
            .json({ response, message: "Password updated", success: true });
        }
      } else {
        const response = await User.findByIdAndUpdate(userId, data, {
          runValidators: true,
          new: true,
        });

        res
          .status(200)
          .json({ response, message: "Changes saved", success: true });
      }
    } else {
      res.status(403).json({
        response,
        message: "You are not allowed to update" + field,
        success: false,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
});

router.post('/profile/deleteImage',jwtAuthMiddleware, async(req,res) => {
  try{
    const data = req.body;
    const response = await deleteImageFromCloudinary(data.imgUrl);
    if(response.success){
      res.status(200).json({...response})
    }else{
      res.status(400).json({...response})
    }
  }catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
})

router.get("/candidates", async (req, res) => {
  try {
    const data = await Candidate.find();
    res.status(200).json({ message: "Candidates found", success: true, data });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
});

router.get("/totalVoters", async (req, res) => {
  try {
    const data = await User.find({userType:'voter'});
    const data2 = await User.aggregate([
      { $match: { isVoted: true } },
      { $sample: { size: 15 } } 
    ]);
    res.status(200).json({ message: "voters found", totalVoters:data.length, usersVoted:data2, success: true});
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
});
module.exports = router;
