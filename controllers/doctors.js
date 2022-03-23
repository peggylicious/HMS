const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const { body, validationResult } = require("express-validator");

let AuthUser = require("../models/auth");
const patientAppointment = require("../models/patient");
let DoctorAppointment = require("../models/doctorAppointments");

module.exports.getAllDoctors = (req, res, next) => {
  AuthUser.doctors
    .find({ role: "doctor" })
    .select("_id firstname lastname email role")
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
    .select("_id firstname lastname email role")
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

module.exports.createDoctorAppointment = (req, res, next) => {
  let appointment = new DoctorAppointment({
      id: mongoose.Types.ObjectId,
      date: req.body.date,
      time: req.body.time,
      doctor_id: req.body.doctor_id
  })
  appointment.save().then(appointment => {
      res.status(200).json(appointment)
  }).catch(err => {
      res.status(500).json(err)
  })
}

module.exports.getAppointment = (req, res, next) => {
    DoctorAppointment.find({doctor_id: req.params.doctor_id}).then(appointment => {
      res.status(200).json(appointment)

    }).catch(err => {
      res.status(500).json(err)
  })
}