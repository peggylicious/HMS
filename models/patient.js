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
    preferredDoctor: {type: Schema.Types.ObjectId, ref: "doctors"}

  });

  


  
  // module.exports = mongoose.model('User', authSchema)
  module.exports = mongoose.model('patientAppointment', patientAppointmentSchema)
