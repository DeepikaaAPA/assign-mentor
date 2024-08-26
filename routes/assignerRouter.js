// create a router
const express = require("express");
const assignerController = require("../Controllers/assignerController");

const assignerRouter = express.Router();

// add routes to the router

assignerRouter.post("/createMentor", assignerController.createMentor);

assignerRouter.post("/createStudent", assignerController.createStudent);
// export the router
module.exports = assignerRouter;
