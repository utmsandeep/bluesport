require("dotenv").config();
require("./config/connect-db");
const express = require('express');
const app = express();
const apiRoutes = require('./app/Http/Routers/api')

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json({ limit: "50mb" }));

app.use("/" , apiRoutes);

app.use("*", (req, res) => {
    res.status(404).json({
      success: "false",
      message: "You reached a route that is not defined on this server",
      data:{}
    });
});


module.exports = app;