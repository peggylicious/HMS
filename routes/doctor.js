const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

const { body, validationResult, check } = require("express-validator");

const AuthUser = require("../models/auth");
const myValidator = require("../middleware/validator");
const authController = require("../controllers/auth");
const allDoctors = require("../controllers/doctors")
const router = express.Router({mergeParams: true});
router.get('/all', allDoctors.getAllDoctors )
router.get('/doctor', allDoctors.getDoctor )
router.get('/appointment-request', allDoctors.getRequestedAppointment )
router.post('/appointment', allDoctors.createDoctorAppointment)
router.put('/update-time', allDoctors.addAppointmentTime)
router.get("/my-appointment/:doctor_id", allDoctors.getAppointment)
module.exports = router;
