const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

const { body, validationResult, check } = require("express-validator");

const AuthUser = require("../models/auth");
const myValidator = require("../middleware/validator");
const authController = require("../controllers/auth");
const appointments = require("../controllers/patient");
const isLoggedIn = require("../middleware/isLoggedIn");
const router = express.Router({mergeParams: true});


// Routes
router.post('/book-appointment', appointments.bookPatientAppointment )
router.get('/appointment/:id',isLoggedIn, appointments.getAppointment)
router.get('/appointments', isLoggedIn, appointments.getAllPatientAppointment)
module.exports = router;
