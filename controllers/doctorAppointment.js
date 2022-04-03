// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// var jwt = require("jsonwebtoken");

// const { body, validationResult } = require("express-validator");

// let DoctorAppointment = require("../models/doctorAppointments");

// module.exports.createDoctorAppointment = (req, res, next) => {
//     let appointment = new DoctorAppointment({
//         id: mongoose.Types.ObjectId,
//         date: req.body.date,
//         time: req.body.time,
//         doctor_id: req.body.id
//     })
//     appointment.save().then(appointment => {
//         res.status(200).json(appointment)
//     }).catch(err => {
//         res.status(500).json(err)
//     })
// }

// module.exports.getAppointment = (req, res, next) => {
//     DoctorAppointment.find({doctor_id: req.body.doctor_id})
// }