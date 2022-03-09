const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const patientAppointment = require("../models/patient");

let AuthUser = require("../models/auth");

module.exports.bookPatientAppointment = (req, res, next) => {
  const bookAppointment = new patientAppointment({
    _id: new mongoose.Types.ObjectId(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    date: req.body.date,
    requestedBy: "62263f7ae11586424906fe30",
    preferedDoctor: "6220cdc90a547b978e7b0da3",
  });

  bookAppointment
    .save()
    .then((result) => {
      res.status(200).json({ message: "Appointment created" });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

module.exports.getAppointment = (req, res, next) => {
  patientAppointment
    .findOne({ _id: "622649b92c3474f20e1685ef" })
    .populate("requestedBy", "firstname")
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};
