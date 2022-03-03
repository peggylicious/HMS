const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const { body, validationResult } = require("express-validator");

let AuthUser = require("../models/auth");

module.exports.getAllDoctors = (req, res, next) => {
  AuthUser.doctors
    .find({ role: "doctor" })
    .select("_id email role")
    .then((doctors) => {
      console.log(doctors);
      res.status(200).json({ doctors });
    })
    .catch((err) => {
      res.status(401).json({ err });
    });
};
module.exports.getDoctor = (req, res, next) => {
  console.log("First name ", req.query.firstname)

  AuthUser.doctors
    .find({ firstname: { $regex: req.query.firstname, $options: "i" } })
    .select("_id firstname role")
    .then((doctors) => {
      console.log(doctors);
      res.status(200).json({ doctors });
    })
    .catch((err) => {
      res.status(401).json({ err });
    });
};
