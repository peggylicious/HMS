const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const { body, validationResult } = require("express-validator");

const AuthUser = require("../models/auth");

module.exports.login = (req, res, next) => {
  // Look for user with email
  let foundUser;
  const user = new AuthUser({
    email: req.body.email,
    password: req.body.password,
  });
  // if(req.body.email === ""){
  //   return res.status(401).json({ message: "Enter a valid email address" });
  // }
  // checkErrors(req, res)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json(errors.array());
  }
  AuthUser.findOne({ email: req.body.email }).then((userExists) => {
    console.log("User is ", userExists);
    // checkErrors(req)

    if (userExists === null) {
      // let ab = new Error("User already exists")
      // ab.status = 401;
      // ab.message = "op"
      // throw ab
      // next(ab)
      return res.status(401).json({ message: "User does not exists" });
    }
    console.log(
      "Body Pass ",
      req.body.password,
      " | Db Pass ",
      userExists.password
    );
    let comparePassword = bcrypt.compare(
      req.body.password,
      userExists.password
    );
    foundUser = userExists;
    comparePassword
      .then((passwordIsCorrect) => {
        console.log("Password is correct", passwordIsCorrect);
        if (passwordIsCorrect === false) {
          return res.status(401).json({
            message: "Auth failed 1",
          });
        }
        var token = jwt.sign(
          { email: req.body.email, tid: foundUser._id },
          "shhhhh"
        );
        console.log("Token ", token);
        return res.status(200).json({
          message: "Auth successful",
          token: token,
          loggedUserId: foundUser._id,
        });
      })
      .catch((err) => {
        next(err);
      });
  });
};

module.exports.signup = (req, res, next) => {
  console.log(req.body.email);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json(errors.array());
  }
  // console.log(checkErrors(req))
  // checkErrors(req)
  // console.log(req.body);

  //   AuthUser.findOne
  AuthUser.findOne({ email: req.body.email }).then((userfound) => {
    console.log("My user ", userfound);
    if (req.body.email === undefined) {
      console.log(req);
      return res.status(500).json({
        message:
          "No data was submitted. Make sure you are using the correct headers / content-type",
      });
    }
    if (userfound !== null) {
      console.log("Null of ", userfound);
      return res.status(401).json({ message: "User already exists" });
    }
    bcrypt.hash(req.body.password, 10, function (err, hash) {
      // Check for password equality
      if (req.body.password !== req.body.confirmPassword) {
        return res
          .status(401)
          .json([{ msg: "password do not match", param: "password" }]);
      }
      // Frontend should verify that both passwords are same b4 sending to Backend
      const user = new AuthUser({
        id: mongoose.Types.ObjectId,
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.email,
        password: hash,
        confirmPassword: hash,
      });
      // Store hash in your password DB.
      console.log(userfound, "else");
      return user
        .save()
        .then((newUser) => {
          console.log("newUser ", newUser);
          res.status(200).json({ message: "User created", data: newUser });
        })
        .catch((err) => {
          res.status(500).json({ err });
        });
    });
  });
};

// function checkErrors(bodyReq, bodyRes){
//   const errors = validationResult(bodyReq);
//   if (!errors.isEmpty()) {
//     console.log(errors.array());
//     return bodyRes.status(400).json(errors.array());
//   }
// }
