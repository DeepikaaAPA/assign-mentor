const Mentor = require("../models/mentor");

const assignerController = {
  createMentor: async (request, response) => {
    try {
      const { id, name } = request.body;
      const result_id = await Mentor.findOne({ id });

      if (result_id)
        return response.status(400).json({ message: "mentor exists already" });

      const newMentor = new Mentor({ id, name, students: null });
      await newMentor.save(newMentor);

      response.status(200).json({ message: `Created mentor ${id}` });
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  },
};

module.exports = assignerController;
