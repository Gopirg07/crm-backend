var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const { UserModel } = require("../schemas/userSchema");
const mongoose = require("mongoose");
const { dbUrl } = require("../common/dbConfig");
const {
  hashPassword,
  comparePassword,
  createToken,
  validate,
  createForgetToken,
  roleCheck,
} = require("../common/auth");
const { SendResetEmail } = require("./MailSender");

mongoose.connect(dbUrl);

/* GET users listing. */

//GET ALL
router.get("/getAll", validate, roleCheck, async (req, res, next) => {
  try {
    let user = await UserModel.find({});
    res
      .status(200)
      .send({ message: "User Data Fetched Successfully!!!", user });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

//SignUP
router.post("/signUp", async (req, res, next) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      let hashedPassword = await hashPassword(req.body.password);
      req.body.password = hashedPassword;
      let user = await UserModel.create(req.body);
      res.status(200).send({ message: "User Signup Successfull !!!", user });
    } else {
      res.status(400).send({ message: "User Already Exists" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

//Login
router.post("/signIn", async (req, res, next) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      if (await comparePassword(req.body.password, user.password)) {
        let token = await createToken({
          name: user.name,
          role: user.role,
          id: user._id,
          role: user.role,
        });
        let role = user.role;
        res
          .status(200)
          .send({ message: "User Login Successfull !!!", token, role });
      } else {
        res.status(402).send({ message: "Invalid Password" });
      }
    } else {
      res.status(403).send({ message: "User Doesn't Exists" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Errors", error });
  }
});

//DELETE
router.delete("/deleteUser/:id", async (req, res, next) => {
  try {
    let user = await UserModel.findOne({ _id: req.params.id });
    if (user) {
      let user = await UserModel.deleteOne({ _id: req.params.id });
      res.status(200).send({ message: "User Deleted Successfully !!!", user });
    } else {
      res.status(403).send({ message: "User Doesn't Exists" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Errors", error });
  }
});

//Forgot Password
router.post("/forgetPassword", async (req, res) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      //create token
      let token = await createForgetToken({ id: user._id });

      //send mail
<<<<<<< HEAD
      const url = `https://gcrm-frontend.netlify.app//reset-password/${token}`;
=======
      const url = `https://gcrm-frontend.netlify.app/reset-password/${token}`;
>>>>>>> 4d342ca12f7c2b1a36ff693d0ec12e4d8284caf6
      const name = user.name;
      const email = user.email;
      SendResetEmail(email, url, "Reset Your Password", name);

      //success
      res
        .status(200)
        .send({ message: "Link Has Been Sent To Your Email Id", token });
    } else {
      res.status(400).send({ message: "Invalid User" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

//Reset Password
router.post("/resetPassword", async (req, res) => {
  try {
    if (req.headers.authorization) 
    {
      let token = req.headers.authorization.split(" ")[1];
      let data = await jwt.decode(token);
      let currentTime = Math.floor(+new Date() / 1000);
      if (currentTime < data.exp) 
      {
        let hashedPassword = await hashPassword(req.body.password); 
        let user=data

        let updatedData=await UserModel.findOneAndUpdate({_id:user.id},{password:hashedPassword}) 
        res.status(200).send({ message: "Password Changed Successfully !!!"});
      } 
      else 
      {
        res.status(401).send({ message: "Token Expired Try Again" });
      } 
    } 
    else 
    {
      res.status(401).send({ message: "Token Not Found" });
    }
  } 
  catch (error) 
  {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});
module.exports = router;
