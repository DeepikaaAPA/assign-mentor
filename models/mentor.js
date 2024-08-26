const mongoose = require("mongoose");

// create a schema
const mentorSchema = new mongoose.Schema({
  id: String,
  name: String,
  students: { type: [String], default: [] },
});

// create a model and export it
module.exports = mongoose.model("Mentor", mentorSchema, "mentors");
