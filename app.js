// import the express module
const express = require("express");
const assignerRouter = require("./routes/assignerRouter");
const requestLogger = require("./utils/logger");
const cors = require("cors");

// create an express application
const app = express();

// use the express middleware for parsing json data
app.use(express.json());

// use the express middleware for logging
app.use(requestLogger);

app.use("/api/v1", assignerRouter);

module.exports = app;
