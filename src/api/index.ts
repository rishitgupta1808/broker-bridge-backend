const express = require("express");
const Router = express.Router();

Router.use("/user", require('./user'))
Router.use("/company", require('./company'))
Router.use("/project", require('./project'))
Router.use("/post", require('./post'))

export { Router };

module.exports = Router;
