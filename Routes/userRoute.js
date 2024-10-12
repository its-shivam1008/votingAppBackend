const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Candidate = require("../models/Candidate");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");
const { sendVerificationEmailNodeMailer } = require("../email/sendEmailVerification");

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
      res.status(403).json({ error: "admin is alreaady present." });
    } else {
      const userByEmail = await User.findOne({ email: data.email });
      if (userByEmail) {
        res
          .status(403)
          .json({
            success: false,
            message: "User with this email is already present",
          });
      }

      const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newData = { ...data, verifyCode, verifyCodeExpiry: expiryDate };
      const newPerson = new User(newData);
      const response = await newPerson.save();

      const payload = {
        id: response.id,
        name: response.name,
        userType:response.userType,
        isVerified:response.isVerified
      };
      const token = generateToken(payload);

      const emailResponse = await sendVerificationEmailNodeMailer(
        data.email,
        data.name,
        verifyCode
      );
      if (!emailResponse.success) {
        res.status(403).json({message: emailResponse.message, success: true })
      }
  
      res.status(201).json({ message:"Verification email has been sent.",  response, token });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { adhaarNum, password } = req.body;
    const user = await User.findOne({ adhaarNum: adhaarNum });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ error: "Incorrect Adhaar number or password" });
    } else {
      const payload = {
        id: user.id,
        name: user.name,
        userType:user.userType,
        isVerified:user.isVerified
      };
      const token = generateToken(payload);
      res.status(200).json({ token });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData.id;
    const user = await User.findById(userId);
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/profile/:field", jwtAuthMiddleware, async (req, res) => {
  try {
    const field = req.params.field;
    const data = req.body;
    const userId = req.user.id;
    if (field == "address" || field == "contactNum" || field == "password") {
      if (field == "password") {
        const { currentPass, newPass } = req.body;

        const user = await User.findById(userId);

        if (!user || !(await user.comparePassword(currentPass))) {
          res.status(401).json({ error: "Incorrect password" });
        } else {
          user.password = newPass;
          const response = await user.save();

          res.status(200).json({ response, mssg: "Updated " + field });
        }
      } else {
        const response = await User.findByIdAndUpdate(userId, data, {
          runValidators: true,
          new: true,
        });

        res.status(200).json({ response, mssg: "Updated " + field });
      }
    } else {
      res
        .status(403)
        .json({ response, mssg: "You are not allowed to update" + field });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/candidates", async (req, res) => {
  try {
    const data = await Candidate.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
