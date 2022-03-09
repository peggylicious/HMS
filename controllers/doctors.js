const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const { body, validationResult } = require("express-validator");

let AuthUser = require("../models/auth");
const patientAppointment = require("../models/patient");

module.exports.getAllDoctors = (req, res, next) => {
  AuthUser.doctors
    .find({ role: "doctor" })
    .select("_id email role")
    .then((doctors) => {
      res.status(200).json({ doctors });
    })
    .catch((err) => {
      res.status(401).json({ err });
    });
};
module.exports.getDoctor = (req, res, next) => {

  AuthUser.doctors
    .find({ firstname: { $regex: req.query.firstname, $options: "i" } }) // e.g. http://localhost:3000/doctors/doctor/?firstname=do
    .select("_id firstname role")
    .then((doctors) => {
      res.status(200).json({ doctors });
    })
    .catch((err) => {
      res.status(401).json({ err });
    });
};
module.exports.getAppointment = (req, res, next) => {
  patientAppointment.find({preferredDoctor: "6228e34518a9493675846410"}).populate("preferredDoctor", "firstname email").then(appointments => {
    res.status(200).json(appointments);
  }).catch(err => {
    res.status(500).json(err);
  })
}