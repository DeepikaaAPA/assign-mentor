const mongoose = require("mongoose");

// create a schema
const studentSchema = new mongoose.Schema({
  id: String,
  name: String,
  mentor: {
    type: String,
    default: null,
  },
  previous_mentor: {
    type: String,
    default: null,
  },
});

// create a model and export it
module.exports = mongoose.model("Student", studentSchema, "Students");
