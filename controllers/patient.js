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
    time: req.body.time,
    requestedBy: req.body.requestedBy,
    preferredDoctor: req.body.preferredDoctor,
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
    .findOne({ _id: req.params.id })
    .populate("requestedBy", "firstname")
    .populate("preferredDoctor", "firstname")
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

module.exports.getAllPatientAppointment = (req, res, next) => {
  patientAppointment
    .find({ requestedBy: req.userId })
    .then((appointments) => {
      res.status(200).json({ appointments });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};
