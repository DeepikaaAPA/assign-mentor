const Mentor = require("../models/mentor");
const Student = require("../models/student");

const assignerController = {
  createMentor: async (request, response) => {
    try {
      const { id, name } = request.body;
      const mentor_id = await Mentor.findOne({ id });

      if (mentor_id)
        return response.status(400).json({ message: "mentor exists already" });

      const newMentor = new Mentor({ id, name, students: null });
      await newMentor.save();

      response.status(200).json({ message: `Created mentor ${id}` });
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  },
  createStudent: async (request, response) => {
    try {
      const { id, name } = request.body;
      const student_id = await Student.findOne({ id });

      if (student_id)
        return response.status(400).json({ message: "student exists already" });

      const newStudent = new Student({
        id,
        name,
      });
      await newStudent.save();

      response.status(200).json({ message: `Created student ${id}` });
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  },
};

module.exports = assignerController;
