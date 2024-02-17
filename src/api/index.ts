const express = require("express");
const Router = express.Router();

Router.use("/user", require('./user'))
Router.use("/company", require('./company'))

export { Router };

module.exports = Router;
