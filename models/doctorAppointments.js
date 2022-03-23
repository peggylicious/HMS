const mongoose = require("mongoose");
const { Schema } = mongoose;


const doctorAppointmentSchema = mongoose.Schema({
    date: String,
    time: String, 
    doctor_id: {type: String, ref: "doctors"}
    // appointments: Array,
    // requestedBy: {type: Schema.Types.ObjectId, ref: 'patients'}, 
    // preferredDoctor: {type: String, ref: "doctors"}
  });

  module.exports = mongoose.model('doctorappointment', doctorAppointmentSchema)
