const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const { body, validationResult } = require("express-validator");

let AuthUser = require("../models/auth");

// let {patients, doctors} = require("../models/auth");
// let AuthUser;
module.exports.login = (req, res, next) => {
  console.log(req.params.role )
  if (req.params.role === "doctor"){
    AuthUser = AuthUser.doctors
  }
  if (req.params.role === "patient"){
    AuthUser = AuthUser.patients
  }
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
  console.log(req.params.role);
  if((req.params.role !== "doctor") && (req.params.role != "patient")){
    return res.status(404).json({
      message:
        "You are not allowed to register",
    });
  }
  if (req.params.role === "doctor"){
    AuthUser = AuthUser.doctors
  }
  if (req.params.role === "patient"){
    AuthUser = AuthUser.patients
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json(errors.array());
  }
  AuthUser.findOne({ email: req.body.email }).then((userfound) => {
    console.log("My user ", userfound);
    if (req.body.email === undefined) {
      console.log(req);
      return res.status(500).json({
        message:
          "No data was submitted. Make sure you are using the correct headers / content-type",
      });
    }
    if (userfound !== null) { // If email exists
      console.log("Null of ", userfound);
      return res.status(401).json({ message: "User already exists" });
    }
    bcrypt.hash(req.body.password, 10, function (err, hash) { // Encrypt password
      if (req.body.password !== req.body.confirmPassword) { // Check for password equality
        return res
          .status(401)
          .json([{ msg: "password do not match", param: "password" }]);
      }
      // Frontend should also verify that both passwords are same b4 sending to Backend
      const user = new AuthUser({
        id: new mongoose.Types.ObjectId(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        confirmPassword: hash,
        role: req.params.role
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

