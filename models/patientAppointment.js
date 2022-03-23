const mongoose = require("mongoose");
const { Schema } = mongoose;


const patientAppointmentSchema = mongoose.Schema({
    date: String,
    time: String, 
    requestedBy: {type: Schema.Types.ObjectId, ref: 'patients'}, 
    preferredDoctor: {type: String, ref: "doctors"}
  });

  module.exports = mongoose.model('doctorappointment', doctorAppointmentSchema)
