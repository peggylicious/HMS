const mongoose = require("mongoose");
const { Schema } = mongoose;

const authSchema = mongoose.Schema({
    firstname:  String, // String is shorthand for {type: String}
    lastname: String,
    email: String,
    password: String, 
    confirmPassword: String,
  });

  module.exports = mongoose.model('User', authSchema)