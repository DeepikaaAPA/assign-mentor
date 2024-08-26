// create a router
const express = require("express");
const assignerController = require("../Controllers/assignerController");

const assignerRouter = express.Router();

// add routes to the router

assignerRouter.post("/createMentor", assignerController.createMentor);

assignerRouter.post("/createStudent", assignerController.createStudent);

assignerRouter.get(
  "/getStudentstoAssign",
  assignerController.getStudentsToAssign
);

assignerRouter.get("/getMentors", assignerController.getMentors);

assignerRouter.put("/assignStudents", assignerController.assignStudents);

assignerRouter.put("/assignMentor", assignerController.assignMentor);

assignerRouter.get("/getMentees", assignerController.getMentees);
// export the router
module.exports = assignerRouter;
