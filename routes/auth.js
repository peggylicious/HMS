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

router.post(
  "/signup", 
    [check('email', "Email address is not valid").isEmail(), check('password', "Your password is too short. Should be atleast 5 characters").isLength({min: 5}), check('firstname', "Enter a valid first name").notEmpty(), check('lastname', "Enter a valid last name").notEmpty()],
    // password must be at least 5 chars long
    // body("password").isLength({ min: 3 }),
    // body("confirmPassword").isLength({ min: 3 }),
    // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i"),
  authController.signup
);

router.post("/login", [check('email', "Enter a valid email address").isEmail()], authController.login);

module.exports = router;
