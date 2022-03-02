const mongoose = require("mongoose");
const { Schema } = mongoose;

const authDoctorSchema = mongoose.Schema({
    firstname:  String, // String is shorthand for {type: String}
    lastname: String,
    email: String,
    password: String, 
    confirmPassword: String,
    role: String
  });

  module.exports = mongoose.model('doctors', authDoctorSchema)