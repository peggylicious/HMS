const mongoose = require("mongoose");
const { Schema } = mongoose;

  const patientAppointmentSchema = mongoose.Schema({
    firstname:  String, // String is shorthand for {type: String}
    lastname: String,
    date: String,
    time: String,
    date: String,
    requestedBy: {type: Schema.Types.ObjectId, ref: 'patients'}, 
    diagnosis: Boolean,
    description: String,
    preferedDoctor: String

  });

  


  
  // module.exports = mongoose.model('User', authSchema)
  module.exports = mongoose.model('appointment', patientAppointmentSchema)
