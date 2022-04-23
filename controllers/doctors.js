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
module.exports.getRequestedAppointment = (req, res, next) => {
  patientAppointment
    .find({ preferredDoctor: "6228e34518a9493675846410" })
    .populate("preferredDoctor", "firstname email")
    .then((appointments) => {
      res.status(200).json(appointments);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports.createDoctorAppointment = (req, res, next) => {
  let appointment = new DoctorAppointment({
    id: mongoose.Types.ObjectId,
    date: req.body.date,
    time: req.body.time,
    doctor_id: req.body.doctor_id,
  });
  DoctorAppointment.findOne({ doctor_id: req.body.doctor_id, date: req.body.date }).then(result => {
    console.log(result)
    if(result?.date === req.body.date ){
      return res.status(401).json({message: "Date already exists", result});
    }
    appointment
    .save()
    .then((appointment) => {
      res.status(200).json(appointment);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  })
  
};
module.exports.addAppointmentTime = (req, res, next) => {
  DoctorAppointment.findOne({ doctor_id: req.body.doctor_id, date: req.body.date }) // Find by id and date\
  .then(resu => {
    if(resu.time.includes(req.body.time)){
      return res.status(401).json({message: "Time already exists"});
    }
    DoctorAppointment.updateOne({ doctor_id: req.body.doctor_id, date: req.body.date }, {"$push": {time: req.body.time}}, { "new": true, "upsert": true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  })  
  
};
module.exports.getAppointment = (req, res, next) => {
  // Use query parameters month and year
  console.log(req.query);
  DoctorAppointment.find({ doctor_id: req.params.doctor_id })
    .then((appointment) => {
      let c = appointment.filter((item) => {
        let a = item.date.split("-");
        return a[1] === req.query.month && a[0] === req.query.year;
      });
      console.log(c);
      res.status(200).json(c);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};