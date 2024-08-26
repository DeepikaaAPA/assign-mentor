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

      /*1. update mentors collection*/
      await Mentor.updateOne(
        { id: mentor },
        { $addToSet: { students: { $each: students } } }
      );
      /* 2. update students collection */
      await Student.updateMany(
        { id: { $in: students } },
        { $set: { mentor: mentor } }
      );
      return response.status(200).json({
        message: `${students.length} students added to ${mentor}`,
      });
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  },
  assignMentor: async (request, response) => {
    try {
      const { student, mentor } = request.body;
      const studentDocument = await Student.findOne({ id: student });
      const curr_mentor = studentDocument.mentor;
      //set previous_mentor
      await Student.updateOne(
        { id: student },
        { $set: { previous_mentor: curr_mentor } }
      );
      //update mentor in students collection
      await Student.updateOne({ id: student }, { $set: { mentor } });
      //update in mentors collection
      //1.add new student to the new mentor
      await Mentor.updateOne(
        { id: mentor },
        { $addToSet: { students: student } }
      );

      //2. remove student from previous mentor
      await Mentor.updateOne(
        { id: curr_mentor },
        { $pull: { students: student } }
      );

      return response.send(
        `Assigned ${studentDocument.name}  to ${mentor} from  ${curr_mentor}`
      );
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  },
  getMentees: async (request, response) => {
    try {
      const { mentor } = request.body;
      const { name, students } = await Mentor.findOne({ id: mentor });
      console.log(students);
      return response.status(200).json({ mentor: name, students });
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  },
  getPreviousMentor: async (request, response) => {
    try {
      const { student } = request.body;
      const { previous_mentor } = await Student.findOne(
        { id: student },
        { _id: 0, __v: 0 }
      );
      response.status(200).json({ student, previous_mentor });
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  },
};

module.exports = assignerController;
