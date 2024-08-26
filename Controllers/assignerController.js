const Mentor = require("../models/mentor");
const Student = require("../models/student");

const assignerController = {
  createMentor: async (request, response) => {
    try {
      const { id, name } = request.body;
      const mentor_id = await Mentor.findOne({ id });

      if (mentor_id)
        return response.status(400).json({ message: "mentor exists already" });

      const newMentor = new Mentor({ id, name });
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

      return response.status(200).json({ message: `Created student ${id}` });
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  },
  getStudentsToAssign: async (request, response) => {
    try {
      const studentsToAssign = await Student.find(
        { mentor: null },
        { _id: 0, __v: 0 }
      );
      response.status(200).json({ studentsToAssign });
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  },
  getMentors: async (request, response) => {
    try {
      /* getting mentor details along with a calculated field studentsCount in the project option */
      /* const mentors = await Mentor.find(
        {  },
        {
          _id: 0,
          id: 1,
          name: 1,
          students: 1,
          studentsCount: { $size: "$students" },
        }
      );*/
      /* selecting only mentors who have mentees count <10 since max mentee count for a mentor is assumed to be 10  */
      const mentors = await Mentor.aggregate([
        {
          $project: {
            _id: 0,
            id: 1,
            name: 1,
            studentsCount: { $size: "$students" },
          },
        },
        { $match: { studentsCount: { $lt: 10 } } },
      ]);
      response.status(200).json({ mentors });
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  },
  assignStudents: async (request, response) => {
    try {
      const { mentor, students } = request.body;
      await Mentor.updateOne(
        { id: mentor },
        { $addToSet: { students: { $each: students } } }
      );
      return response.status(200).json({
        message: `${students.length} students added to ${mentor}`,
      });
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  },
};

module.exports = assignerController;
