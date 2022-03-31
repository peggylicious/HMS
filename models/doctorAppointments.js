const mongoose = require("mongoose");
const { Schema } = mongoose;


const doctorAppointmentSchema = mongoose.Schema({
    date: String,
    time: {type: Array}, 
    doctor_id: {type: String, ref: "doctors"}, 
    // requestedAppointments: {type: Array, ref: "patientAppointment"}
    // appointments: Array,
    // requestedBy: {type: Schema.Types.ObjectId, ref: 'patients'}, 
    // preferredDoctor: {type: String, ref: "doctors"}
  });

  module.exports = mongoose.model('doctorappointment', doctorAppointmentSchema)
