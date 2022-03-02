const mongoose = require("mongoose");
const { Schema } = mongoose;

// const authSchema = mongoose.Schema({
//     firstname:  String, // String is shorthand for {type: String}
//     lastname: String,
//     email: String,
//     password: String, 
//     confirmPassword: String,
//     role: String
//   });
  const authPatientSchema = mongoose.Schema({
    firstname:  String, // String is shorthand for {type: String}
    lastname: String,
    email: String,
    password: String, 
    confirmPassword: String,
    role: String
  });

  const authDoctorSchema = mongoose.Schema({
    firstname:  String, // String is shorthand for {type: String}
    lastname: String,
    email: String,
    password: String, 
    confirmPassword: String,
    role: String
  });

  module.exports.doctors = mongoose.model('doctors', authDoctorSchema)
  
  // module.exports = mongoose.model('User', authSchema)
  module.exports.patients = mongoose.model('patients', authPatientSchema)
