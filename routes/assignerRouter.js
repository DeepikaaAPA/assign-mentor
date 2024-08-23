// create a router
const express = require("express");
const assignerController = require("../controllers/assignerController");
const assignerRouter = express.Router();

// add routes to the router
assignerRouter.post("/", assignerController.createassigner);
assignerRouter.get("/", assignerController.getassigners);
assignerRouter.get("/:id", assignerController.getassigner);
assignerRouter.put("/:id", assignerController.updateassigner);
assignerRouter.delete("/:id", assignerController.deleteassigner);

// export the router
module.exports = assignerRouter;
